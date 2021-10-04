import axios from "axios";
const baseUrl = "/api/users";

const newUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const signupService = {
  newUser,
};

export default signupService;
