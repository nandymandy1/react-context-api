import axios from "axios";

let ax = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

export const setAuthToken = token => {
  token
    ? (ax.defaults.headers.common["Authorization"] = token)
    : delete ax.defaults.headers.common["Authorization"];
};

export default ax;
