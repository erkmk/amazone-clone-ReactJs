import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/e-challange-3fa74/us-central1/api", //The Api (Cloud Function) URL
});

export default instance;
