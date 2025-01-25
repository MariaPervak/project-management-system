const { gql } = require("apollo-server-express");

const typeDefs = gql`

type Task {
   id: Int
   name: String
   title: String
   status: String
   description: String
}

type KanbanTask {
   id: Int
   title: String
   description: String
}

type KanbanColumn {
  id: Int,
  title: String,
  cards: [KanbanTask],
}

type KanbanTasks {
  columns: [KanbanColumn]
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
  role: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Mutation {
   addTask(name:String, title: String, description: String): Task
   signUp(username: String!, email: String!, password: String!, role: String): String!
   signIn(username: String!, password: String!): String!
}

type Query {
   tasks: [Task]!
   kanbanTasks: [KanbanTasks]!
   currentUser: User,
   loginCheck(token: String!): Boolean
}

`;

module.exports = typeDefs;