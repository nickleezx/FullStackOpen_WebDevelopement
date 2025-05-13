const {test, after, beforeEach, describe} = require('node:test')
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

describe('adding blogs', () => {
  test('blogs are returned as json & with correct length', async () => {
    await api.get('/api/blogs')
              .expect('Content-type', /application\/json/)
  
    const result = await helper.blogsInDb()
    assert.strictEqual(result.length, helper.initialBlogs.length)
  })
  
  test("blogs' identifier property is labelled id and not _id", async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body)
  
    for (let blog of response.body){
      assert.strictEqual(Object.hasOwn(blog, 'id'), true)
      assert.strictEqual(Object.hasOwn(blog, '_id'), false)
    }
    console.log('finished')
  })
  
  test('blog is added correctly and successfully', async () => {
    const newBlog = {
      title: "Test by adding a new blog",
      author: "Nick Lee",
      url: "www.nowhere.com",
      likes: 5
    }
  
    const blogsAtStart = await helper.blogsInDb() //helper.blogsInDb() is an async function, needs to be awaited to run properly
    await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const listOfTitles = blogsAtEnd.map(blog => blog.title)
    
    assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)
    assert(listOfTitles.includes(newBlog.title))
  })
  
  test("blog without 'likes' property has default value of 0", async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .expect(201)
      .expect('Content-type', /application\/json/)
  
    const response = await api.get(`/api/blogs`)
    const blogs = response.body
    // console.log(blogs)
  
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
    await api
      .delete(`/api/blogs/${helper.blogToDelete._id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const listOfIds = blogsAtEnd.map(blog => blog.id)
    assert.strictEqual(listOfIds.includes(helper.blogToDelete._id), false)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)
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


after(async () => await mongoose.connection.close())