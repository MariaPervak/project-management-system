const {TaskQuery, TaskMutation} = require("./task");
const {AuthMutation, AuthQuery} = require("./auth");

const resolvers = {
  Query: {
    ...TaskQuery,
    ...AuthQuery,
  },

  Mutation: {
    ...TaskMutation,
    ...AuthMutation,
  },
};

module.exports = resolvers;