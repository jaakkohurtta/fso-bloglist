const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const { usersInDb } = require("../../server/utils/test_helpers");
const app = require("../../app");
const api = supertest(app);
const User = require("../../server/models/user");

// const logger = require("../utils/logger")

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("lolbur", 10);
    const user = new User({ username: "root", name: "Root User", passwordHash });
    await user.save();
  });

  test("creating new user succeeds with unique username", async () => {
    const usersBefore = await usersInDb();

    const newUser = {
      username: "jhurt",
      name: "Jaakko Hurtta",
      password: "kekbur",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAfter = await usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length + 1);

    const usernames = usersAfter.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creating fails with proper status code if username is not unique", async () => {
    const usersBefore = await usersInDb();

    const newUser = {
      username: "root",
      name: "the root",
      password: "alibullenit",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");
    const usersAfter = await usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length);
  });

  test("creating fails with proper status code if username is not valid", async () => {
    const usersBefore = await usersInDb();

    const newUser = {
      username: "ro",
      name: "the root",
      password: "alibullenit",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("minimum allowed length (3)");

    const usersAfter = await usersInDb();
    expect(usersAfter).toHaveLength(usersBefore.length);
  });

  test("creating user without password fails", async () => {
    const newUser = {
      username: "jakehurtxd",
      name: "Jake Hurt",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    expect(result.body.error).toContain("invalid password");

    // logger.info(result.body)
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
