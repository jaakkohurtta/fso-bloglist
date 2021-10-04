const helper = require("../../server/utils/test_helpers");
// const logger = require("../utils/logger")

const { dummyBlogDatabase, dummyBlogDatabaseShort } = require("./dummy_test_blogs");

test("dummy returns one", () => {
  const result = helper.dummy(dummyBlogDatabase);
  expect(result).toBe(1);
});

// total likes of all blogs in db
describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = helper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("when list only has one blog equal likes to that", () => {
    const result = helper.totalLikes(dummyBlogDatabaseShort);
    expect(result).toBe(256);
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.totalLikes(dummyBlogDatabase);
    expect(result).toBe(454);
  });
});

// blog with most likes
describe("blog with most likes", () => {
  test("of empty list is {}", () => {
    const result = helper.favouriteBlog([]);
    expect(result).toEqual({});
  });
  test("when list only has one blog equal blog to that", () => {
    const result = helper.favouriteBlog(dummyBlogDatabaseShort);
    expect(result).toEqual({
      title: "Hannan soppa",
      author: "Hanna Hurtta",
      likes: 256,
    });
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.favouriteBlog(dummyBlogDatabase);
    expect(result).toEqual({
      title: "Hannan soppa",
      author: "Hanna Hurtta",
      likes: 256,
    });
  });
});

// Author with most blogs
describe("author with most blogs", () => {
  test("of empty list is {}", () => {
    const result = helper.mostBlogs([]);
    expect(result).toEqual({});
  });
  test("when list only has one blog equal blog to that", () => {
    const result = helper.mostBlogs(dummyBlogDatabaseShort);
    expect(result).toEqual({
      author: "Hanna Hurtta",
      blogs: 1,
    });
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.mostBlogs(dummyBlogDatabase);
    expect(result).toEqual({
      author: "Hanna Hurtta",
      blogs: 3,
    });
  });
});

// Author with most likes
describe("author with most likes", () => {
  test("of empty list is {}", () => {
    const result = helper.mostLikes([]);
    expect(result).toEqual({});
  });
  test("when list only has one blog equal blog to that", () => {
    const result = helper.mostLikes(dummyBlogDatabaseShort);
    expect(result).toEqual({
      author: "Hanna Hurtta",
      likes: 256,
    });
  });
  test("of a bigger list is calculated right", () => {
    const result = helper.mostLikes(dummyBlogDatabase);
    expect(result).toEqual({
      author: "Hanna Hurtta",
      likes: 411,
    });
  });
});
