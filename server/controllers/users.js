const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
// const logger = require("../utils/logger")

const BCRYPT_SALT_ROUNDS = 10;

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogsAdded", { title: 1, url: 1, likes: 1 });
  response.json(users.map((user) => user.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  // logger.info(body)

  if (!body.password || body.password.length < 3) {
    return response.status(400).send({ error: "invalid password (too short or missing)" });
  }

  const passwordHash = await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS);

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash,
  });

  const newUser = await user.save();
  response.json(newUser);
});

module.exports = usersRouter;
