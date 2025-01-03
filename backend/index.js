require('dotenv').config();
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const {ApolloServer} = require("apollo-server-express");
const bodyParser = require('body-parser');
const express = require("express");
const {getUser} = require("./utils");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const port = 4000;
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    port: port,
    cors: false,
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      let user;
      if (token) {
        user = getUser(token);
      } else {
        user = {role: 'guest'};
      }
      return { user };
    }
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer().then(() => {
  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
  );
});


