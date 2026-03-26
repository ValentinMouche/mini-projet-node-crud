const pool = require('../config/db')

// Créer un utilisateur
const createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  )
  return result.rows[0]
}

// Trouver utilisateur par email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

module.exports = { createUser, findUserByEmail }