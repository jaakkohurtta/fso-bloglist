import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { setUser } from "../reducers/userReducer";
import { setAlert } from "../reducers/alertReducer";

import styled from "styled-components";
import { Button, StyledLink } from "../theme/styledComponents";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
  }
`;

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(
      setAlert({
        message: `${user.name} logged out.`,
        type: "info",
        duration: 4,
      })
    );
    dispatch(setUser(null));

    window.localStorage.clear();
  }; // Log Out Handler

  return (
    <Nav>
      <StyledLink navlink="true" to="/">
        blogs
      </StyledLink>
      <StyledLink navlink="true" to="/users">
        users
      </StyledLink>
      <Button white onClick={logOutHandler}>
        log out
      </Button>
    </Nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Navbar;
