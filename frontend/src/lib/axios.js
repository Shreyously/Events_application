// import axios from 'axios';

// export const axiosInstance = axios.create({
//     baseURL: "https://events-application.onrender.com/api",
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
        
//     }
// });

// // Add request interceptor to add token
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user?.token) {
//             config.headers.Authorization = `Bearer ${user.token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Add response interceptor for handling auth errors
// // axiosInstance.interceptors.response.use(
// //     (response) => response,
// //     (error) => {
// //         if (error.response?.status === 401) {
            
// //             window.location.href = '/login';
// //         }
// //         return Promise.reject(error);
// //     }
// // );
// // Add response interceptor for handling auth errors
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Clear local storage
//             localStorage.removeItem('user');
//             // Use navigate instead of window.location
//             window.location.replace('/login');
//         }
//         return Promise.reject(error);
//     }
// );
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://events-application.onrender.com/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear user data from localStorage
            localStorage.removeItem('user');
            // Use window.location.replace instead of href
            window.location.replace('/login');
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);