const {TaskQuery, TaskMutation, TaskSubscription} = require("./task");
const {AuthMutation, AuthQuery} = require("./auth");
const {StatusQuery} = require("./status");

const resolvers = {
  Query: {
    ...TaskQuery,
    ...StatusQuery,
    ...AuthQuery,
  },

  Mutation: {
    ...TaskMutation,
    ...AuthMutation,
  },

  Subscription: {
    ...TaskSubscription,
  }
};

module.exports = resolvers;