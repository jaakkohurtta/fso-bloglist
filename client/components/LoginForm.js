import React from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../reducers/userReducer";
import { getUsers } from "../reducers/usersReducer";
import { setAlert } from "../reducers/alertReducer";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useField } from "../hooks/index";

import { Button, Input, Form, InputGroup } from "../theme/styledComponents";

const LoginForm = () => {
  const dispatch = useDispatch();

  const username = useField("text", "username");
  const password = useField("password", "password");

  const logInHandler = async (e) => {
    e.preventDefault();

    // console.log(username, password)
    try {
      const user = await loginService.logIn({
        username: username.props.value,
        password: password.props.value,
      });
      dispatch(setUser(user));
      dispatch(getUsers());
      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));

      dispatch(
        setAlert({
          message: `${user.name} logged in.`,
          type: "info",
          duration: 4,
        })
      );
    } catch (error) {
      console.log(error.message);

      dispatch(
        setAlert({
          message: "Invalid username or password.",
          type: "alert",
          duration: 4,
        })
      );
    }
  }; // Log In Handler

  return (
    <Form inline onSubmit={logInHandler}>
      <InputGroup inline>
        <Input id="loginUsername" {...username.props} />
      </InputGroup>
      <InputGroup inline>
        <Input id="loginPassword" {...password.props} />
      </InputGroup>
      <Button id="loginBtn" type="submit">
        log in
      </Button>
    </Form>
  );
};

export default LoginForm;
