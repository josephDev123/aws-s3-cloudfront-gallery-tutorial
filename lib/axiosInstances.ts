import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL_API}`,
  // timeout: 1000,
});
