
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const GEOCODING_API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;


export const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Allows sending cookies and auth headers
});