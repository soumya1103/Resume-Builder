import axios from "axios";

const baseUrl = "http://localhost:8080";

const pyUrl = "http://localhost:5000";

export const app = axios.create({
  baseURL: baseUrl,
});

export const upload = axios.create({
  baseURL: pyUrl,
});

app.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error?.config?.url !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

app.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authtoken");
    if (Boolean(token)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

upload.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

upload.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
