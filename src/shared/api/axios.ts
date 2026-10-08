import axios from "axios";
import { API_URL } from "../config/api";

export const API = axios.create({
    baseURL: API_URL
})