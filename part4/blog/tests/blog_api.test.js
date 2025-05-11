const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./helper')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json & with correct length', async () => {
  await api.get('/api/blogs')
            .expect('Content-type', /application\/json/)

  const result = await helper.blogsInDb()
  assert.strictEqual(result.length, helper.initialBlogs.length)
})



after(async () => await mongoose.connection.close())