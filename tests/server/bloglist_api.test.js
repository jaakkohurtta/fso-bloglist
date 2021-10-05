const mongoose = require("mongoose");
const supertest = require("supertest");
// const logger = require("../../server/utils/logger");
const app = require("../../app");
const api = supertest(app);
const Blog = require("../../server/models/blog");
// const User = require("../../server/models/user");

const {
  dummyBlogs,
  dummyBlogUpdate,
  dummyBlog,
  dummyBlogWithNoLikes,
  dummyBlogWithMissingFields,
} = require("./dummy_test_blogs");

let testUserToken;
beforeAll(async () => {
  const testUser = {
    username: "test_user",
    name: "Test User",
    password: "test123",
  };

  await api.post("/api/users").send(testUser);
  const result = await api.post("/api/login").send(testUser);
  testUserToken = result.body.token;
});

// insert blogs to db with test user before each test
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(dummyBlogs);
});

// Initial GET tests
describe("when getting initial bloglist", () => {
  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(dummyBlogs.length);
  });

  test("blog id field is defined", async () => {
    const response = await api.get("/api/blogs");

    // logger.info(response.body)
    response.body.forEach((blog) => {
      // logger.info(blog.id)
      expect(blog.id).toBeDefined();
    });
  });
});

// POST blog tests
describe("when posting a new blog", () => {
  test("return 401 if no token found on request", async () => {
    await api.post("/api/blogs").send(dummyBlog).expect(401);
  });

  test("add new blog to db", async () => {
    // logger.info(testUserToken);

    await api.post("/api/blogs").set("Authorization", `bearer ${testUserToken}`).send(dummyBlog);
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(dummyBlogs.length + 1);
  });

  test("set new blog likes to 0 if undefined", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${testUserToken}`)
      .send(dummyBlogWithNoLikes);
    expect(response.body.likes).toBe(0);
  });

  test("return 400 if blog has missing fields", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${testUserToken}`)
      .send(dummyBlogWithMissingFields)
      .expect(400);
  });
});

// DELETE test
describe("when deleting a blog from db", () => {
  let newblog;

  beforeEach(async () => {
    newblog = await api.post("/api/blogs").set("Authorization", `bearer ${testUserToken}`).send(dummyBlog);
  });

  test("blog is succesfully deleted", async () => {
    // get and id to be deleted
    const blog = newblog.body;

    await api.delete(`/api/blogs/${blog.id}`).set("Authorization", `bearer ${testUserToken}`).expect(204);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(dummyBlogs.length);

    const titles = response.body.map((b) => b.title);
    expect(titles).not.toContain(blog.title);
  });
});

// PUT test
describe("when updating a blog", () => {
  test("return matches request", async () => {
    // get id to be updated
    const blog = await Blog.findOne();

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .set("Authorization", `bearer ${testUserToken}`)
      .send(dummyBlogUpdate);

    // logger.info(response)
    const updatedBlog = {
      title: response.body.title,
      author: response.body.author,
      url: response.body.url,
      likes: response.body.likes,
    };
    expect(updatedBlog).toEqual(dummyBlogUpdate);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
