const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const JWT_SECRET='JWT_SECRET';

const testQuery = async () => {
  const result = await pool.query(`SELECT * FROM tasks`);
  return result
}
const addQuery = async (name, title, description) => {
  try {
    const status = 'backlog'
    const result = await pool.query(`INSERT INTO tasks (name, title, status, description) 
VALUES ($1, $2, $3, $4) RETURNING id, name, title, description, status`, [name, title, status, description] );
    return result;
  } catch (error) {
    return { message: error.message };
  }
}

const addUser = async (username, email, password) => {
  email = email.trim().toLowerCase();
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
    console.log(err);
    throw new Error('Error creating account');
  }
}

const findUser = async (username) => {
  try {
    const user = await pool.query(`SELECT * FROM users where username = $1 OR email = $1`, [username]);
  } catch (err){
    console.log(err);
  }
}

// findUser('admin@mail.ru' ).then(result => {});

const getStatuses = async () => {
  try {
    const result = await pool.query(`SELECT * FROM status`);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}

getStatuses().then(result => {
  console.log(result)
});