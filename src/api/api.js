
import axios from "axios";

export const WEATHER_API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = import.meta.env.VITE_BASE_URL;


export const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Allows sending cookies and auth headers
});