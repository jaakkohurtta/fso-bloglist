/**
 * @jest-environment jsdom
 */

import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
// import { prettyDOM } from "@testing-library/dom"
import Blog from "../../client/components/Blog";

const testUser = {
  name: "Test User",
  username: "testuser",
};

const testBlog = {
  id: "1234",
  title: "A Test Blog",
  author: "Test Author",
  likes: "42",
  url: "https://atestblog.com/",
  userId: testUser,
  comments: [{ content: "first comment!", id: "1" }],
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return state.concat(action.payload);
    default:
      return state;
  }
};

const reducer = combineReducers({ user: userReducer, blogs: blogsReducer });
const store = createStore(reducer);

test("renders blog component", () => {
  store.dispatch({ type: "SET_USER", payload: testUser });
  store.dispatch({ type: "ADD_BLOG", payload: testBlog });

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: "1234",
    }),
    useRouteMatch: () => ({ url: "/blogs/blog.id" }),
  }));

  const blogComponent = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/blogs/1234"]}>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
      </MemoryRouter>
    </Provider>
  );

  // console.log(prettyDOM(blogComponent.container))

  expect(blogComponent.container).toHaveTextContent("A Test Blog");
  expect(blogComponent.container).toHaveTextContent("Test Author");
  expect(blogComponent.container).toHaveTextContent("added by: Test User");
  expect(blogComponent.container).toHaveTextContent("likes: 42");
});
