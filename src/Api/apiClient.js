import axios from "axios";

const baseUrl = "http://localhost:8080";

const app = axios.create({
  baseURL: baseUrl,
});

// app.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       if (error?.config?.url !== "/lms/login" && error?.config?.url !== "/lms/current-user") {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default app;

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
