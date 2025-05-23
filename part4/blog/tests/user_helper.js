const User = require('../models/user')

const usersInDb = async () => {
  const result = await User.find({})
  return result.map(u => u.toJSON())
}

module.exports = {
  usersInDb,
}