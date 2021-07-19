//import {axios} from "axios";

//const API_URL = "http://localhost:5000/auth/";


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
    localStorage.removeItem("user");
};

const AuthActions = {logout, getCurrentUser};

export default AuthActions;