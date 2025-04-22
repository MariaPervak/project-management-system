require('dotenv').config();
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const express = require("express");
const { PubSub } = require('graphql-subscriptions');
const bodyParser = require('body-parser');
const { getUser } = require("./utils");

class SimplePubSub {
  constructor() {
    this.subscriptions = {};
    this.nextId = 0;
  }

  publish(triggerName, payload) {
    if (this.subscriptions[triggerName]) {
      for (const [id, listener] of Object.entries(this.subscriptions[triggerName])) {
        listener(payload);
      }
    }
  }

  subscribe(triggerName, onMessage) {
    const id = this.nextId++;
    if (!this.subscriptions[triggerName]) {
      this.subscriptions[triggerName] = {};
    }
    this.subscriptions[triggerName][id] = onMessage;

    return () => {
      delete this.subscriptions[triggerName][id];
      if (Object.keys(this.subscriptions[triggerName]).length === 0) {
        delete this.subscriptions[triggerName];
      }
    };
  }

  asyncIterator(triggers) {
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next: () => new Promise(resolve => {
        const unsubscribe = this.subscribe(triggers, payload => {
          unsubscribe();
          resolve({ value: payload, done: false });
        });
      }),
      return: () => Promise.resolve({ done: true })
    };
  }
}

// Создаем экземпляр PubSub для подписок
const pubsub = new SimplePubSub();

if (!pubsub.asyncIterator) {
  pubsub.asyncIterator = function(triggers) {
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next() {
        return new Promise(resolve => {
          const listener = value => {
            resolve({ value, done: false });
          };
          this.subscribe(triggers, listener);
        });
      },
      return() {
        return Promise.resolve({ done: true });
      }
    };
  };
}

const app = express();
app.use(bodyParser.json());

const port = 4000;

// Создаем схему GraphQL
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      let user;
      if (token) {
        user = getUser(token);
      } else {
        user = { role: 'guest' };
      }
      return { user, pubsub }; // Добавляем pubsub в контекст
    }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Создаем HTTP сервер
  const httpServer = createServer(app);

  // Создаем WebSocket сервер
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Подключаем обработчик подписок
  useServer(
      {
        schema,
        context: (ctx) => {
          // Получаем токен из connectionParams
          const token = ctx.connectionParams?.authorization || '';
          let user;
          if (token) {
            user = getUser(token);
          } else {
            user = { role: 'guest' };
          }
          return { user, pubsub }; // Добавляем pubsub в контекст
        },
      },
      wsServer
  );

  httpServer.listen(port, () => {
    console.log(`🚀 HTTP Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    console.log(`🚀 WebSocket Server ready at ws://localhost:${port}${apolloServer.graphqlPath}`);
  });
}

startServer();