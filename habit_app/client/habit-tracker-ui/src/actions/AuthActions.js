import {axios} from "axios";
const API_URL = "http://localhost:5000/auth/";

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    logout,
    getCurrentUser,
};