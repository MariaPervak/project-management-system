const pool = require("./db");

const testQuery = async () => {
  const result = await pool.query(`SELECT * FROM tasks`);
  console.log(result)
  return result
}
const addQuery = async (name, title, description) => {
  try {
    const status = 'backlog'
    const result = await pool.query(`INSERT INTO tasks (name, title, status, description) 
VALUES ($1, $2, $3, $4) RETURNING id, name, title, description, status`, [name, title, status, description] );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
    return { message: error.message };
  }
}

addQuery('test2name', 'test2title', 'test2description').then(result => {});