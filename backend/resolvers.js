const pool = require("./db");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const JWT_SECRET='JWT_SECRET';

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        const result = await pool.query(`SELECT * FROM tasks`);
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
    signUp: async (root, { username, email, password }) => {
      email = email.trim().toLowerCase();
      username = username.trim().toLowerCase();
      const hashed = await bcrypt.hash(password, 10);
      try {
        const result = await pool.query(
          `INSERT INTO users 
            (username, email, password) 
            VALUES ($1, $2, $3)
            RETURNING id
           `,
          [username, email, hashed]
        );
        return jwt.sign({ id: result.rows[0].id }, JWT_SECRET);
      } catch (err) {
        throw new Error('Error creating account');
      }
    },
    signIn: async (parent, { username, password }) => {
      if (username) {
        username = username.trim().toLowerCase();
      }
      const user = await pool.query(`SELECT * FROM users where username = $1 OR email = $1`, [username]);
      const {password: hashedPassword, id} = user.rows[0];
      if (!user) {
        throw new AuthenticationError('Пользователь не найден');
      }
      const valid = await bcrypt.compare(password, hashedPassword);
      if (!valid) {
        throw new AuthenticationError('Неверное имя пользовтаеля или пароль');
      }
      return jwt.sign({ id }, JWT_SECRET);
    }
  },
};

module.exports = resolvers;