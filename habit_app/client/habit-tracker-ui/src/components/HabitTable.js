import {useEffect, useState} from "react";
import {Button, Table, TableHead, Checkbox, Fab,TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import habitTableActions from "../actions/habitTableActions"
import {useHistory} from "react-router-dom";
import authHeader from "../actions/auth-header";
import CreateHabitForm from "./CreateHabitForm";


function HabitTable(props) {
    const [cells, setCells] = useState(0);
    const [habits,setHabits] = useState([]);
    const minusDays = (date, days) => {
        date.setDate(date.getDate() - days);
        return date;
    }

    const [dates, setDates] = useState([minusDays(new Date(), 6),
        minusDays(new Date(), 5),
        minusDays(new Date(), 4),
        minusDays(new Date(), 3),
        minusDays(new Date(), 2),
        minusDays(new Date(), 1),
        minusDays(new Date(), 0)
    ]);

    const dayRef = ['Su','M',"Tu","W","Th","F","Sa"];
    const formatDate = (dt) => {
        return String(dt.getFullYear())+"-"+
            String(dt.getMonth()+1).padStart(2, 0)+ "-"+
            String(dt.getDate()).padStart(2, 0);
    }

    const [formatedDates, setFormatedDates] = useState(dates.map(formatDate));

    let history = useHistory();

    const reloadHabits = () => {
        habitTableActions.getHabits(formatedDates[0],formatedDates[6]).then((data) => {
            setHabits(data.habit_data);
            //console.log(habits);
        }).catch(function (error) {
            history.push('/auth/login')
        });
    }

    useEffect(() =>{
        reloadHabits()
    }, []);

    const findHabit = (attribute, value) => {
        for (let [index, habit] of habits.entries()) {
            if (habit[attribute] == value) {
                return index;
            }
        }
        return -1;
    }

    const handleChange = (event) => {
        //locate habit that event refers to
        const habitIndex = findHabit("habit_id", event.target.name);
        let index = -1;
        let action = 'add';
        if (habits[habitIndex].habit_action.includes(event.target.value)) {
            index = habits[habitIndex].habit_action.indexOf(event.target.value);
            action = 'delete';
        }
        //send request to backend to make change in database
        const promise = habitTableActions.updateHabitAction(event.target.name,event.target.value, action);
        //once we get a successful response, modify the info on the front end to match what is now in the db
        const dataPromise = promise.then((response) => {
            let newHabits = JSON.parse(JSON.stringify(habits));
            if (index > -1){
                newHabits[habitIndex].habit_action.splice(index, 1);
            } else {
                newHabits[habitIndex].habit_action.push(event.target.value);
            }
            setHabits(newHabits);
        });
    }



    return (
        <div>
               <table>
                    <thead>
                        <tr rowSpan="2">
                            <th rowSpan = "2" key="HabitIDHeader">Habit ID</th>
                            <th rowSpan="2" key="HabitNameHeader">Habit Name</th>
                            {dates.map((dt, index) => (
                                <th key = {`day${index}Header`}>
                                    {dayRef[dt.getDay()]}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            {dates.map((dt, index) => (
                                <th date={formatDate(dt)} key = {`date${index}Header`}>{dt.getDate() }</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {habits.map((h, index) => (
                        <tr key={`HabitRow${index}`}>
                            <td key={`HabitID${index}`}>{h.habit_id}</td>
                            <td key={`HabitTitle${index}`}>{h.habit_title}</td>
                            {formatedDates.map((dt) => (
                                <td date={dt} key={`HabitAction_${dt}_${index}`}>
                                    <Checkbox name={h.habit_id} value = {dt} checked ={h.habit_action.includes(dt) } onClick={handleChange}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                        <CreateHabitForm habits = {habits} setHabits = {setHabits}/>
                    </tfoot>
                </table>
        </div>
    );
}
export default HabitTable;