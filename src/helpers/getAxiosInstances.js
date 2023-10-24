import axios from "axios";

const quizCraftBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 15000,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export { quizCraftBackend };
