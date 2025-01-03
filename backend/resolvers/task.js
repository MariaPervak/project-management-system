const pool = require("../db");

const TaskQuery = {
  tasks: async (_, __, contextValue ) => {
    try {
      if (contextValue.user.role !== 'guest') {
        const result = await pool.query(`SELECT * FROM tasks`);
        return result.rows;
      }
      return [];
    } catch (error) {
      return { message: error.message };
    }
  },
}

const TaskMutation = {
  addTask: async (_, args) => {
    try {
      const {name, title, description} = args;
      const status = 'backlog'
      const result = await pool.query(`INSERT INTO tasks (name, title, status, description) 
VALUES ($1, $2, $3, $4) RETURNING id, name, title, description, status`, [name, title, status, description] );
      return result.rows[0];
    } catch (error) {
      return { message: error.message };
    }
  },
}

module.exports = {
  TaskQuery,
  TaskMutation,
}