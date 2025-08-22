
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:5001/api", 
  withCredentials: true, 
});

export default apiClient;
