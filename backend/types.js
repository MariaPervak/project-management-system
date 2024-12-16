const { gql } = require("apollo-server");

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

type Mutation {
   addTask(name:String, title: String, description: String): Task
}

type Query {
   tasks: [Task]!
}

`;

module.exports = typeDefs;