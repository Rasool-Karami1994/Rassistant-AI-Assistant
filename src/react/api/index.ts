import axios, { AxiosInstance } from "axios";

const defaultHeaders = {
  "content-type": "application/json",
};

export const apiClient1: AxiosInstance = axios.create({
  baseURL: "https://686127438e7486408445150c.mockapi.io/api/v1/",
  headers: defaultHeaders,
});

export const apiClient2: AxiosInstance = axios.create({
  baseURL: "https://6863942e88359a373e956b56.mockapi.io/api/v1/",
  headers: defaultHeaders,
});

export const apiClient3: AxiosInstance = axios.create({
  baseURL: "https://6863febd88359a373e97244e.mockapi.io/api/v1/",
  headers: defaultHeaders,
});
export const apiClient4: AxiosInstance = axios.create({
  baseURL: "https://686409b988359a373e974afc.mockapi.io/api/v1/",
  headers: defaultHeaders,
});
export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
} as const;
