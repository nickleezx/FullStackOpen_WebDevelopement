const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res, next) => {
  const result = await Blog.find({})
  res.json(result)
});

blogsRouter.get('/:id', async (req, res, next) => {
  const result = await Blog.findById(req.params.id)
  console.log(result)
  console.log(result.toJSON())
  if (result)
    res.json(result)
  else 
    res.status(404).end()
})

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

blogsRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})


blogsRouter.put('/:id', async (req, res, next) => {
  const {title, author, url, likes} = req.body

  let blogToUpdate = await Blog.findById(req.params.id)
  
  if (!blogToUpdate)
    return res.status(404).end()

  blogToUpdate.title = title ?? blogToUpdate.title
  blogToUpdate.author = author ?? blogToUpdate.author
  blogToUpdate.url = url ?? blogToUpdate.url
  blogToUpdate.likes = likes ?? blogToUpdate.likes

  const result = await blogToUpdate.save()
  res.json(result)

})

module.exports = blogsRouter