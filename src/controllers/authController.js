const { createUser, findUserByEmail} = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const {email, password} = req.body

        // Vérifier si l'utilisateur existe déja
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return res.status(400).json({message : 'User already exists'})
        }
        // Hash du mdp
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Créer user
        const user = await createUser(email,hashedPassword)

        res.status(201).json({message : 'User created',userId: user.id})
    } catch(err){
        console.error(err)
        res.status(500).json({message: 'Server error'})
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body

        const user = await findUserByEmail(email)
        if (!user) return res.status(400).json({message: 'Invalid credentials'})

        // Comparer le mdp
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: 'Invalid credentials'})
        
        // Créer JWT 
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({token})
    } catch (err) {
        console.error(err)
        res.status(500).json({message : 'Server error'})
    }
}

module.exports = {register , login}