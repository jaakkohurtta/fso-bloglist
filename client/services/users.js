import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((i, j) => j.blogsAdded.length - i.blogsAdded.length);
};

const userService = {
  getUsers,
};

export default userService;
