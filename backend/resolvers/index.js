const {TaskQuery, TaskMutation} = require("./task");
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
};

module.exports = resolvers;