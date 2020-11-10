import axios from "axios";

const instance = axios.create({
  baseURL: "...", //The Api (Cloud Function) URL
});

export default instance;
