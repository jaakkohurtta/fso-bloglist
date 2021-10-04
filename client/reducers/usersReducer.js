import userService from "../services/users";

export const getUsers = () => {
  return async (dispatch) => {
    const response = await userService.getUsers();
    dispatch({
      type: "GET_USERS",
      payload: response,
    });
  };
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERS":
      return (state = action.payload);
    default:
      return state;
  }
};

export default usersReducer;
