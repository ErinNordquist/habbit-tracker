import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/"

function getHabits(start_date, end_date) {
    console.log('called getHabits function');
    const promise = axios.get(API_URL+"home"+"/"+start_date+"&"+end_date, {headers: authHeader()});
    const dataPromise = promise.then((response) => {
        console.log(response);
        return response.data;
    });
    return dataPromise;
};



function updateHabitAction(habit_id, habit_action, action) {
    const requestURL = API_URL + "update"+"/"+habit_id+"&"+habit_action;
    if (action === 'add') {
        const promise = axios.post(requestURL, {}, {headers: authHeader()});
        return promise;
    } else {
        const promise = axios.delete(requestURL, {headers: authHeader()});
        return promise;
    }
}

function getHabitActions() {
    console.log('called getHabitActions');
    //const promise = axios.get(API_URL+)
}


export default {getHabits,updateHabitAction};