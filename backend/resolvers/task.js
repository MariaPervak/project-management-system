const pool = require("../db");
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

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
  kanbanTasks: async (_, __, contextValue ) => {
    try {
      if (contextValue.user.role !== 'guest') {
        const result = await pool.query(`SELECT * FROM tasks`);
        const columns = new Set();
        const cards = [];
        const tasks = {
          columns: [],
        };
        result.rows.forEach((row, id) => {
          // columns.add(row.status);
          const columnIndex = tasks.columns.findIndex((column) => column.title === row.id);
          if (columnIndex > -1){

          }
          const card = {
            id: row.id,
            title: row.title,
            description: row.description,
          }
          const column = {
            id: row.id,
            title: row.title,
          }

        })
        const arrayColumns = Array.from(columns);




        return tasks;
      }
      return [];
    } catch (error) {
      return { message: error.message };
    }
  },
}

const TaskMutation = {
  addTask: async (_, args, { pubsub }) => {
    try {
      const { name, title, status, description } = args;
      const result = await pool.query(
          `INSERT INTO tasks (name, title, status, description)
           VALUES ($1, $2, $3, $4)
             RETURNING id, name, title, description, status`,
          [name, title, status, description]
      );

      const newTask = result.rows[0];

      pubsub.publish('TASK_ADDED', { taskAdded: newTask });

      return newTask;
    } catch (error) {
      return { message: error.message };
    }
  },
};

const TaskSubscription = {
  taskAdded: {
    subscribe: (_, __, { pubsub }) => {
      if (!pubsub || typeof pubsub.asyncIterator !== 'function') {
        throw new Error('PubSub not properly initialized');
      }
      return pubsub.asyncIterator(['TASK_ADDED']);
    },
  },
  taskUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['TASK_UPDATED']),
  },
};

module.exports = {
  TaskQuery,
  TaskMutation,
  TaskSubscription
}