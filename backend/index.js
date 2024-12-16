// const { ApolloServer } = require("apollo-server");
// import { ApolloServer } = require("apollo-server");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const {ApolloServer} = require("apollo-server");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});