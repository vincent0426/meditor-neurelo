import axios from "axios";

export const customAxios = axios.create({
  withCredentials: true,
  // baseURL: process.env["NEURELO_API_BASE_URL"],
  // headers: {
  //   "X-API-KEY": process.env["NEURELO_API_KEY"]
  // }
});

customAxios.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);