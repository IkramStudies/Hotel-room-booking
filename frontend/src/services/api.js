import axios from "axios";

// Create an instance of axios with a custom config
const api = axios.create({
  // This is the base URL for your backend server
  baseURL: "http://localhost:5000/api",
  // withCredentials ensures that cookies/sessions are sent with every request
  // This is required for your Google Passport authentication to work!
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// This is the line your error is looking for!
export default api;
