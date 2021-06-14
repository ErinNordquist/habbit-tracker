import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/"

function getHabits() {
    console.log('called getHabits function');
    const promise = axios.get(API_URL+"home", {headers: authHeader()});
    const dataPromise = promise.then((response) => {
        //console.log(response);
        return response.data;
    });
    return dataPromise;
};

function getHabitActions() {
    console.log('called getHabitActions');
    //const promise = axios.get(API_URL+)
}


export default {getHabits,};