const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Task {
   id: Int
   name: String
   title: String
   status: String
   description: String
}

type TaskResult {
   id: Int
   message: String
   tasks: [Task]
}

type User {
  id: ID!
  username: String!
  email: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Mutation {
   addTask(name:String, title: String, description: String): Task
   signUp(username: String!, email: String!, password: String!): String!
   signIn(username: String!, password: String!): String!
}

type Query {
   tasks: [Task]!
   currentUser: User
}

`;

module.exports = typeDefs;