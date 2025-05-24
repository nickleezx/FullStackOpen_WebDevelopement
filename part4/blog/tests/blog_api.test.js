const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./helper')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // await User.deleteMany({})
  // await api.post('/api/users')
  // .send({username: "root", password: "test_password"})
  // .expect(201)
})

describe('adding blogs', () => {
  test('blogs are returned as json & with correct length', async () => {
    await api.get('/api/blogs')
              .expect('Content-type', /application\/json/)
  
    const result = await helper.blogsInDb()
    assert.strictEqual(result.length, helper.initialBlogs.length)
  })
  
  test("blogs' identifier property is labelled id and not _id", async () => {
    const response = await api.get('/api/blogs')
  
    for (let blog of response.body){
      assert.strictEqual(Object.hasOwn(blog, 'id'), true)
      assert.strictEqual(Object.hasOwn(blog, '_id'), false)
    }
  })
  
  test('blog is added correctly and successfully', async () => {
    const newBlog = {
      title: "Test by adding a new blog",
      author: "Nick Lee",
      url: "www.nowhere.com",
      likes: 5
    }

    const user = {
      username: "root",
      password: "test_password"
    }

    const loginResponse = await api.post('/api/login')
                          .send(user)
                          .expect(200)
                          .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    const blogsAtStart = await helper.blogsInDb() //helper.blogsInDb() is an async function, needs to be awaited to run properly
    await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const listOfTitles = blogsAtEnd.map(blog => blog.title)
    
    assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)
    assert(listOfTitles.includes(newBlog.title))
  })
  
  test("blog without 'likes' property has default value of 0", async () => {
    const user = {
      username: "root",
      password: "test_password"
    }

    const loginResponse = await api.post('/api/login')
                          .send(user)
                          .expect(200)
                          .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token
    
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-type', /application\/json/)
  
    const response = await api.get(`/api/blogs`)
    const blogs = response.body
  
    const foundBlog = blogs.find(blog => {
      // console.log(blog.id)
      // console.log(helper.blogWithoutLikes._id)
      return blog.title === helper.blogWithoutLikes.title
    })
  
    assert.strictEqual(foundBlog.likes, 0)
  
  })
  
  test('adding blog without url returns 400 Bad request', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .expect(400)
    })
    
  test('adding blog without title returns 400 Bad request', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutTitle)
      .expect(400)
  
  })
  
})

describe('deleting blogs', () => {
  test('deleting a certain blog returns 204 and removes blog from database', async () => {
    //login for user to get token to authenticate operation
    const user = {
      username: "root",
      password: "test_password"
    }

    const loginResponse = await api.post('/api/login')
                          .send(user)
                          .expect(200)
                          .expect('Content-Type', /application\/json/)
    const token = loginResponse.body.token

    //create new blog for to be deleted
    const newBlog = {
      title: 'some_new_blog',
      author: 'perry',
      url: 'https://perrylee.com',
      likes: 12
    }

    const result = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    //blog at start only counts after new blog has been added to see if delete operation works
    const blogsAtStart = await helper.blogsInDb()

    const idToDelete = result.body.id
    
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const listOfIds = blogsAtEnd.map(blog => blog.id)
    assert.strictEqual(listOfIds.includes(idToDelete), false)
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length-1)
  })
})

describe('updating blogs', () => {
  test('PUT-ing a valid blog returns the new blog and updates the database', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart[0]
    
    blogToUpdate.title = "updated title"
    blogToUpdate.author = "new author"
    blogToUpdate.url = "http://updated.com"
    blogToUpdate.likes += 2
    
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    const updatedBlog = await Blog.findById(blogToUpdate.id)
    assert.deepStrictEqual(blogToUpdate, updatedBlog.toJSON())

  })
})


after(async () => {
  await mongoose.connection.close()
})