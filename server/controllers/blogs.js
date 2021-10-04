/* eslint-disable no-undef */
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const logger = require("../utils/logger");

// get all blogs from db
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("userId", { name: 1, username: 1 }).populate("comments");

  response.json(blogs.map((blog) => blog.toJSON()));
});

// add new blog to db
blogsRouter.post("/", async (request, response) => {
  // logger.info(request.body)

  // get & validate user token
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.COOKBOOK_DRAFT);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token" });
  }

  // get user
  const user = request.user;

  // create object for new blog
  const newBlog = request.body;
  if (newBlog.likes === undefined) {
    newBlog.likes = 0;
  }

  // add user to blog
  newBlog.userId = user._id;

  // set new blog
  const blog = new Blog(newBlog);

  if (newBlog.title === undefined || newBlog.url === undefined) {
    response.status(400).send({ error: "missing title and/or url" });
  } else {
    const savedBlog = await blog.save();
    const populatedBlog = await Blog.findById(savedBlog._id).populate("userId", { name: 1, username: 1 });

    user.blogsAdded = user.blogsAdded.concat(savedBlog._id);
    await user.save();

    response.status(201).json(populatedBlog);
  }
});

// add comment
blogsRouter.post("/:id/comments", async (request, response) => {
  // get & validate user token

  logger.info(request.body);
  logger.info(request.params.id);

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.COOKBOOK_DRAFT);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token" });
  }

  const newComment = request.body;
  newComment.blogId = request.params.id;
  const blog = await Blog.findById(request.params.id);

  const comment = new Comment(newComment);

  // logger.info(blog)

  if (!newComment.content) {
    response.status(400).send({ error: "empty comment" });
  } else {
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment._id);

    await blog.save();
    savedBlog = await Blog.findById(blog._id).populate("userId", { name: 1, username: 1 }).populate("comments");

    response.status(201).json(savedBlog);
  }
});

// delete blog from db
blogsRouter.delete("/:id", async (request, response) => {
  // get & validate user token
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.COOKBOOK_DRAFT);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token" });
  }

  // get user from
  const user = request.user;
  // get blog
  const blog = await Blog.findById(request.params.id);

  // compare blog.userid to decodedToken.id to authorize request
  if (blog.userId.toString() === decodedToken.id.toString()) {
    // delete blog from db
    await blog.delete();
    logger.info("deleted resource:", blog);

    // update user.blogsAdded by filtering out the deleted blog id
    await User.findByIdAndUpdate(user.id, {
      blogsAdded: user.blogsAdded.filter((id) => id.toString() !== request.params.id.toString()),
    });

    response.status(204).end();
  } else {
    response.status(401).send({ error: "unauthorized request" });
  }
});

// update blog in db
blogsRouter.put("/:id", async (request, response) => {
  // blog's updated info
  const updatedBlogInfo = request.body;

  // get & validate user token
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.COOKBOOK_DRAFT);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogInfo, { new: true })
    .populate("userId", { name: 1, username: 1 })
    .populate("comments");

  if (updatedBlog === null) {
    response.status(400).send({ error: `no blog by name ${request.body.title} found` });
  } else {
    response.json(updatedBlog);
  }
});

module.exports = blogsRouter;
