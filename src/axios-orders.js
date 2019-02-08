import axios from "axios";

const instance = axios.create({
  baseURL: "https://lettuce-eat-server.firebaseio.com/"
});

export default instance;
