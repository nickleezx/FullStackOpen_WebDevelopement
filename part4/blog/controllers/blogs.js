const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res, next) => {
  const result = await Blog.find({})
  res.json(result)
});

blogsRouter.post('/', async (req, res, next) => {
  if (!req.body.url || !req.body.title)
    res.status(400).end()

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes ?? 0
    });

    const result = await blog.save()
    res.status(201).json(result)
})

module.exports = blogsRouter