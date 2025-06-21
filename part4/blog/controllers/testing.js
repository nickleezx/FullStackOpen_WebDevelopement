const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/reset', async (req, res) => {
  await User.findOneAndDelete({username: "testing user"})
  await Blog.deleteMany({})
  res.status(200).end()
})


module.exports = router