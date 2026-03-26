const pool = require('../config/db')

// Créer une tâche
const createTask = async (userId, title, description) => {
  const result = await pool.query(
    'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, description]
  )
  return result.rows[0]
}

// Récupérer toutes les tâches d'un utilisateur
const getTasksByUser = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )
  return result.rows
}

// Mettre à jour une tâche
const updateTask = async (taskId, title, description, completed) => {
  const result = await pool.query(
    `UPDATE tasks 
     SET title=$1, description=$2, completed=$3, updated_at=NOW() 
     WHERE id=$4 RETURNING *`,
    [title, description, completed, taskId]
  )
  return result.rows[0]
}

// Supprimer une tâche
const deleteTask = async (taskId) => {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id=$1 RETURNING *',
    [taskId]
  )
  return result.rows[0]
}

module.exports = { createTask, getTasksByUser, updateTask, deleteTask }