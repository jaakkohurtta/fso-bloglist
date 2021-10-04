const _ = require("lodash");
const logger = require("./logger");
const User = require("../models/user");

const dummy = (blogs) => {
  logger.info(blogs);
  return 1;
};

// Return total likes of all blogs
const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    let likes = blogs.reduce((sum, blog) => {
      return sum + blog.likes;
    }, 0);

    // logger.info(likes)
    return likes;
  }
};

// Return favourite blog
const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    // logger.info(blogs[0].title, blogs[0].author, blogs[0].likes)
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  } else {
    let favIndex = 0,
      mostLikes = 0;

    blogs.forEach((blog, index) => {
      if (blog.likes >= mostLikes) {
        favIndex = index;
        mostLikes = blog.likes;
      }
    });

    return {
      title: blogs[favIndex].title,
      author: blogs[favIndex].author,
      likes: blogs[favIndex].likes,
    };
  }
};

// Return author with most blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1,
    };
  } else {
    let bloggers = _.orderBy(
      _.map(_.countBy(blogs, "author"), (value, key) => {
        return { author: key, blogs: value };
      }),
      "blogs",
      "desc"
    );

    // logger.info(bloggers)

    return {
      author: bloggers[0].author,
      blogs: bloggers[0].blogs,
    };
  }
};

// Return author with most total likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  } else {
    let blogList = _.groupBy(blogs, "author");
    let bloggers = [];

    _.forEach(blogList, (blogger, key) => {
      let totalLikes = 0;
      _.forEach(blogger, (blog) => {
        totalLikes += blog.likes;
      });
      bloggers.push({ author: key, totalLikes: totalLikes });
    });

    bloggers = _.orderBy(bloggers, "totalLikes", "desc");

    return {
      author: bloggers[0].author,
      likes: bloggers[0].totalLikes,
    };
  }
};

// Return users in Mongo DB
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb,
};
