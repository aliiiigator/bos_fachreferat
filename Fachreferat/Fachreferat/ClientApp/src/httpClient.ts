import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7264/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});