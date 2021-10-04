import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../reducers/alertReducer";
import signupService from "../services/signup";
import { useField } from "../hooks/index";

import { Button, Input, Form, InputGroup } from "../theme/styledComponents";

const SignUpForm = ({ setActiveForm }) => {
  const dispatch = useDispatch();

  const name = useField("text", "full name");
  const username = useField("text", "username");
  const password = useField("password", "password");

  const signUpHandler = async (e) => {
    e.preventDefault();

    const newUserObj = {
      name: name.props.value,
      username: username.props.value,
      password: password.props.value,
    };

    try {
      const response = await signupService.newUser(newUserObj);
      dispatch(
        setAlert({
          message: `${response.username} signed up succesfully.`,
          type: "info",
          duration: 4,
        })
      );
      setActiveForm(null);
    } catch (error) {
      console.log(error.message);
      dispatch(
        setAlert({
          message: "Sign up failed!",
          type: "alert",
          duration: 4,
        })
      );
    }

    e.target.reset();
  };

  return (
    <Form inline onSubmit={signUpHandler}>
      <InputGroup inline>
        <Input id="signupName" {...name.props} />
      </InputGroup>
      <InputGroup inline>
        <Input id="signupUsername" {...username.props} />
      </InputGroup>
      <InputGroup inline>
        <Input id="signupPassword" {...password.props} />
      </InputGroup>
      <Button id="submitSignupBtn" type="submit">
        sign up
      </Button>
    </Form>
  );
};

SignUpForm.propTypes = {
  setActiveForm: PropTypes.func.isRequired,
};

export default SignUpForm;
