import axios from "axios";
import authHeader from "./auth-header";
import AuthActions from "./AuthActions";

const API_URL = "http://localhost:5000/"

function checkForExpiredToken(promise, history) {
    promise.catch(function (error) {
        if (error.response.status === 401) {
            console.log('Token is Expired');
            AuthActions.logout();
            history.push("/auth/login");
        }
    })
}

function getHabits(history) {
    //console.log('called getHabits function');
    //console.log(authHeader());

    const promise = axios.get(API_URL+"home", {headers: authHeader()});
    checkForExpiredToken(promise, history);
    return promise;
};

function updateHabitAction(habit_id, habit_action, action, history) {
    const requestURL = API_URL + "update/"+habit_id+"&"+habit_action;
    if (action === 'add') {
        const promise = axios.post(requestURL, {}, {headers: authHeader()});
        checkForExpiredToken(promise, history);
        return promise;
    } else {
        const promise = axios.delete(requestURL, {headers: authHeader()});
        checkForExpiredToken(promise, history);
        return promise;
    }
}

function addHabit(habit_title, history){
    const requestURL = API_URL + "habit";
    const promise = axios.post(requestURL, {'habit_title': habit_title}, {headers:authHeader()});
    checkForExpiredToken(promise);
    return promise;
}

function updateHabitTitle(habit_id, new_habit_title, history) {
    const requestURL = API_URL+`habit/${habit_id}`;
    console.log(new_habit_title);
    const requestBody = {habit_title: `${new_habit_title}`};
    const promise = axios.put(requestURL, requestBody,{headers:authHeader()});
    checkForExpiredToken(promise);
    return promise;
}

function deleteHabit(habit_id, history) {
    const requestURL = API_URL+`habit/${habit_id}`;
    console.log(`delete habit ${habit_id}`);
    const promise = axios.delete(requestURL, {headers:authHeader()});
    checkForExpiredToken(promise);
    return promise;
}

const habitTableActions = {getHabits,updateHabitAction, addHabit, updateHabitTitle, deleteHabit};

export default habitTableActions;