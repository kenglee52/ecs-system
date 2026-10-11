import axios from "axios";

const api = axios.create({
   baseURL: "https://app-6ac709b8.deploy.meerasolution.com",
   headers: {"Content-Type": "application/json"}
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if(token){
         config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
})

export default api