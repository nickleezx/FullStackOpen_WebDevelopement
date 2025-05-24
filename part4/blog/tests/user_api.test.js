const {describe, test, beforeEach, after, afterEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./user_helper')

const api = supertest(app)

describe('Creating users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users')
    .send({username: "root", password: "test_password"})
    .expect(201)
  })

  test('adding a valid user', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const user = {
      username: "new_user",
      name: "new user",
      password: "test_password"
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(u => u.username)
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
    assert(usernames.includes(user.username))
  })

  test('adding user with invalid username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: '',
      name: 'no username',
      password: 'test_password'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('adding user with invalid password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'no password',
      name: 'no password',
      password: ''
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('adding user with existing username fails', async () => {
    const userAtStart = await helper.usersInDb()
    
    const user = {
      username: "root",
      name: "some_new_user",
      password: "new_test_password"
    }
    
    await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    
    assert.strictEqual(userAtStart.length, usersAtEnd.length)
  })
})

// afterEach(async () => {
//   await User.deleteMany({})
//   await api.post('/api/users')
//   .send({username: "root", password: "test_password"})
//   .expect(201)

// })

after(async () => {
  await mongoose.connection.close()
})