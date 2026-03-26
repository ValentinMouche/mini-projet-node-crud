require('dotenv').config()
// Charge variables .env

const express = require('express')
const cors = require('cors')

const app = express()
// Créer le serveur

// Middlewares globaux

app.use(cors())
// Autorise les requêtes externes

app.use(express.json())
// Permet de lire du JSON dans les requêtes

// Route test
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running'})
})

// Port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`)
})


// ajout temporaire : 
const pool = require('./src/config/db')

pool.query('SELECT NOW()', (err,res)=> {
    if(err) console.error(err)
    else console.log('DB Time :', res.rows[0])
})

const authRoutes = require('./src/routes/authRoutes')
app.use('/api/auth', authRoutes)

const taskRoutes = require('./src/routes/taskRoutes')
app.use('/api/tasks', taskRoutes)
