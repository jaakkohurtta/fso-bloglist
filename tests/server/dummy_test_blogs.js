const dummyBlogs = [
  {
    title: "Hannan soppa",
    author: "Hanna Hurtta",
    url: "https://www.hannansoppa.com/",
    likes: 256,
  },
  {
    title: "Hurtta & Hurtta",
    author: "Hanna Hurtta",
    url: "https://www.hurttahurtta.com",
    likes: 111,
  },
  {
    title: "Jaakon musacorner",
    author: "Jaakko Hurtta",
    url: "https://www.jaakonmusacorner.com",
    likes: 1,
  },
  {
    title: "Soppaa ja sirkushuveja",
    author: "Hanna Hurtta",
    url: "https://www.soppaajasirkushuveja.com/",
    likes: 44,
  },
  {
    title: "Dev Odyssey 2021: From Zero To Hero with Fullstackopen.com",
    author: "Jaakko Hurtta",
    url: "https://www.fromzerotoheroblog.com",
    likes: 42,
  },
];

const dummyBlog = {
  title: "A random blog",
  author: "John Doe",
  url: "https://www.arandomblog.com",
  likes: 2,
};

const dummyBlogUpdate = {
  title: "Hannan soppa part 2",
  author: "Hanna Hurtta",
  url: "https://www.hannansoppa.com/",
  likes: 565,
};

const dummyBlogWithNoLikes = {
  title: "No Likes Blog",
  author: "Jake Hurt",
  url: "https://www.notagainblog.com/",
};

const dummyBlogWithMissingFields = {
  author: "Jake Hurt",
  likes: 2,
};

// Dummy database
const dummyBlogDatabase = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "Hannan soppa",
    author: "Hanna Hurtta",
    url: "https://www.hannansoppa.com/",
    likes: 256,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Hurtta & Hurtta",
    author: "Hanna Hurtta",
    url: "https://www.hurttahurtta.com",
    likes: 111,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Jaakon musacorner",
    author: "Jaakko Hurtta",
    url: "https://www.jaakonmusacorner.com",
    likes: 1,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "Soppaa ja sirkushuveja",
    author: "Hanna Hurtta",
    url: "https://www.soppaajasirkushuveja.com/",
    likes: 44,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "Dev Odyssey 2021: From Zero To Hero with Fullstackopen.com",
    author: "Jaakko Hurtta",
    url: "https://www.fromzerotoheroblog.com",
    likes: 42,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "No Likes Blog",
    author: "Jake Hurt",
    url: "https://www.notagainblog.com/",
    likes: 0,
    __v: 0,
  },
];

// Dummy db with one block
const dummyBlogDatabaseShort = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "Hannan soppa",
    author: "Hanna Hurtta",
    url: "https://www.hannansoppa.com/",
    likes: 256,
    __v: 0,
  },
];

module.exports = {
  dummyBlogs,
  dummyBlog,
  dummyBlogUpdate,
  dummyBlogWithNoLikes,
  dummyBlogWithMissingFields,
  dummyBlogDatabase,
  dummyBlogDatabaseShort,
};
