/* eslint-disable no-undef */
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  console.log(request.body);
  const user = await User.findOne({ username: request.body.username });

  console.log(user);

  const passwordCorrect = user === null ? false : await bcrypt.compare(request.body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: "invalid username or password " });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(
    userForToken,
    process.env.COOKBOOK_DRAFT,
    { expiresIn: 900 } // expires in 30 mins
  );

  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
