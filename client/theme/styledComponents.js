import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  background-color: #f5f5f5;
  width: 70%;
  padding: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  @media (max-width: 1024px) {
    width: 85%;
  }
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const AppHeader = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 2px solid white;
  width: 100%;
  padding: 5px;
  margin: 10px 0px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AppTitle = styled.span`
  font-size: 24px;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px solid lightgray;
  @media (max-width: 600px) {
    border-right: none;
  }
`;

export const UserInfo = styled.span`
  font-size: 12px;
  color: dimgray;
  @media (max-width: 600px) {
    margin-bottom: 5px;
  }
`;

export const Button = styled.button`
  background: ${(props) => (props.white ? "white" : "mediumspringgreen")};
  color: ${(props) => (props.white ? "dimgray" : "black")};
  padding: 5px 8px;
  margin: 1px 1px;
  border: 1px solid rgba(180, 180, 180, 0.8);
  border-radius: 2px;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 5px;
  margin: 1px 1px;
  width: ${(props) => (props.wide ? "66%" : "99%")};
  &:focus {
    background-color: springgreen;
  }
`;

export const Form = styled.form`
  display: ${(props) => (props.inline ? "inline" : "block")};
  @media (max-width: 768px) {
    display: block;
  }
`;

export const InputGroup = styled.div`
  display: ${(props) => (props.inline ? "inline-block" : "flex")};
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Header3 = styled.h3`
  color: dimgray;
  font-size: 16px;
  margin: 5px;
`;

export const StyledLink = styled(Link)`
  margin-right: ${(props) => (props.navlink ? "5px" : "0")};
  color: dimgray;
`;

export const Main = styled.main`
  margin: 10px 0;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: ${(props) => (props.flex ? "space-between" : "flex-start")};
  align-items: center;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid springgreen;
`;

export const ContentRow = styled.div`
  display: ${(props) => (props.flex ? "flex" : "block")};
  justify-content: center;
  font-size: ${(props) => (props.small ? "14px" : "16px")};
  margin: ${(props) => (props.margin ? "5px 0" : "none")};
  padding: 0 5px;
`;

export const Highlight = styled.span`
  background-color: springgreen;
  border-radius: 5px;
  padding: 0 5px;
`;

export const AlertMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: 5px 0;
`;
