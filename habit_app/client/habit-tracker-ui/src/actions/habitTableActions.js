import axios from "axios";
import authHeader from "./auth-header";
import {useHistory} from "react-router-dom";

const API_URL = "http://localhost:5000/"

function getHabits(start_date, end_date) {
    //console.log('called getHabits function');
    //console.log(authHeader());

    const promise = axios.get(API_URL+"home"+"/"+start_date+"&"+end_date, {headers: authHeader()});
    const dataPromise = promise.then((response) => {
        //console.log(response);
        return response.data;
    }).catch((response) => {
        console.log(response)
        useHistory().push('/');
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

function addHabit(habit_title){
    const requestURL = API_URL + "habit";
    const promise = axios.post(requestURL, {'habit_title': habit_title}, {headers:authHeader()});
    return promise;
}


export default {getHabits,updateHabitAction, addHabit};