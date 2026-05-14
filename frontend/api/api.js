import axios from "axios";

const api = axios.create({
  baseURL: "http://10.71.133.60:5000",
});

export default api;