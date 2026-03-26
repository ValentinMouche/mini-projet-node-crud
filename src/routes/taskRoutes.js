const express = require('express')
const router = express.Router()
const { getTasks, addTask, editTask, removeTask } = require('../controllers/taskController')
const auth = require('../middlewares/authMiddleware')

// Toutes les routes protégées par JWT
router.get('/', auth, getTasks)
router.post('/', auth, addTask)
router.put('/:id', auth, editTask)
router.delete('/:id', auth, removeTask)

module.exports = router