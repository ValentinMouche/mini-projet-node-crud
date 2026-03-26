const { createTask, getTasksByUser, updateTask, deleteTask } = require('../models/taskModel')

// GET /tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.userId)
    res.json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /tasks
const addTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const task = await createTask(req.userId, title, description)
    res.status(201).json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /tasks/:id
const editTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body
    const task = await updateTask(req.params.id, title, description, completed)
    res.json(task)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /tasks/:id
const removeTask = async (req, res) => {
  try {
    const task = await deleteTask(req.params.id)
    res.json({ message: 'Task deleted', task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getTasks, addTask, editTask, removeTask }