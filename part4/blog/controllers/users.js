const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res, next) => {
  const result = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, _id: 1})
  res.json(result)
})

usersRouter.post('/', async (req, res, next) => {
  const {username, name, password} = req.body
  
  if (!username || !password || username.length < 3 || password.length < 3)
    return res.status(400).json({error: "username and password must be at least 3 characters long"})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, 
    name, 
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)  
})

module.exports = usersRouter