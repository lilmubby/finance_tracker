import axios from "axios";
import { phoneIP, routerIP, routerIP2 } from "../constants/ip";

export const axiosInstance = axios.create({
  baseURL: `http://${routerIP2}:5000`,
  timeout: 10000, // 10 seconds
})
