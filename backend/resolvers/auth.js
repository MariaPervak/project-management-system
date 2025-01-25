const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {AuthenticationError} = require("apollo-server-express");
const {getUser} = require("../utils");
const {GraphQLError} = require("graphql/error");

const JWT_SECRET='JWT_SECRET';

const AuthQuery = {
  loginCheck: async (root, {token} ) => {
    try {
      if (token){
        const user = await getUser(token);
        return !!user;
      }
    } catch (error) {
      throw new GraphQLError('Ошибка доступа', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
  },
}

const AuthMutation = {
  signUp: async (root, { username, email, password, role }) => {
    email = email.trim().toLowerCase();
    username = username.trim().toLowerCase();
    role = role || "manager"
    const hashed = await bcrypt.hash(password, 10);
    try {
      const result = await pool.query(
        `INSERT INTO users 
            (username, email, password, role) 
            VALUES ($1, $2, $3, $4)
            RETURNING id
           `,
        [username, email, hashed, role]
      );
      return jwt.sign({ id: result?.rows[0].id, role: result?.rows[0].role }, JWT_SECRET);
    } catch (err) {
      throw new Error('Ошибка при создании аккаунта');
    }
  },
  signIn: async (root, { username, password }) => {
    if (username) {
      username = username.trim().toLowerCase();
    }
    const user = await pool.query(`SELECT * FROM users where username = $1 OR email = $1`, [username]);
    if (!user?.rows.length) {
      throw new AuthenticationError('Пользователь не найден');
    }
    const {password: hashedPassword, id, role} = user.rows[0];
    const valid = await bcrypt.compare(password, hashedPassword);
    if (!valid) {
      throw new AuthenticationError('Неверное имя пользовтаеля или пароль');
    }
    return jwt.sign({ id, role }, JWT_SECRET);
  },
}

module.exports = {
  AuthQuery,
  AuthMutation,
}