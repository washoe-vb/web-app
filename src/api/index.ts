import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) =>
    ({ ...config, headers: { ...config.headers, authorization: localStorage.getItem("token") } }),
  error => Promise.reject(error)
);

export { instance };
