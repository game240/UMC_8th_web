import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});
