const blogsRouter = require("express").Router();
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog");
const User = require('../models/user')
const middleware = require('../utils/middleware');
const blog = require("../models/blog");


blogsRouter.get("/", async (req, res, next) => {
  const result = await Blog
    .find({})
    .populate("user", {username: 1, name: 1, _id: 1});
  res.json(result);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const result = await Blog.findById(req.params.id).populate('user', {username: 1, name: 1, _id: 1});
  // console.log(result);
  // console.log(result.toJSON());
  if (result) res.json(result);
  else res.status(404).end();
});

blogsRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  if (!req.body.url || !req.body.title) res.status(400).end();

  const userId = req.user

  if (!userId)
    return res.status(400).json({error: 'unable to find userId'})

  let user = await User.findById(userId)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes ?? 0,
    user: user._id
  });

  const result = await blog.save();
  if (!user.blogs)
    user.blogs = [result._id]
  else 
    user.blogs = user.blogs.concat(result.id)
  user = await user.save()

  result.user = user

  res.status(201).json(result);
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  const userId = req.user
  const blogToDelete = await Blog.findById(req.params.id)
  const user = await User.findById(userId)

  if (!blogToDelete)
    return res.status(404).json({error: 'blog not found'})

  if (userId.toString() !== blogToDelete.user.toString())
    return res.status(403).json({error: 'forbidden action'})

  await Blog.findByIdAndDelete(blogToDelete.id)
  user.blogs = user.blogs.filter(bId => bId.toString() !== req.params.id)
  // console.log(user.blogs)
  await user.save()

  res.status(204).end()
});

blogsRouter.put("/:id", middleware.userExtractor, async (req, res, next) => {
  const { title, author, url, likes} = req.body;

  let blogToUpdate = await Blog.findById(req.params.id)
                            .populate("user", {username: 1, name: 1, _id: 1});

  if (!blogToUpdate) 
    return res.status(404).end();

  blogToUpdate.title = title ?? blogToUpdate.title;
  blogToUpdate.author = author ?? blogToUpdate.author;
  blogToUpdate.url = url ?? blogToUpdate.url;
  blogToUpdate.likes = likes ?? blogToUpdate.likes;

  const result = await blogToUpdate.save();
  res.json(result);
});

module.exports = blogsRouter;
