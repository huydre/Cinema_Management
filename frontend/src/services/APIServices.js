import axios from "axios";

const baseURL = 'http://localhost:8080/api/';

axios.defaults.withCredentials = true;

const API = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

export default API;