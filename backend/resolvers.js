const pool = require("./db");

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        const result = await pool.query(`SELECT * FROM tasks`);
        console.log(result)
        return result.rows;
      } catch (error) {
        return { message: error.message };
      }
    },
  },

  Mutation: {
    addTask: async (root, args) => {
      try {
        const {name, title, description} = args
        const status = 'backlog'
        const result = await pool.query(`INSERT INTO tasks (name, title, status, description) 
VALUES ($1, $2, $3, $4) RETURNING id, name, title, description, status`, [name, title, status, description] );
        console.log(result)
        return result.rows[0];
      } catch (error) {
        return { message: error.message };
      }
    },
  },
};

module.exports = resolvers;