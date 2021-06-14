import {useEffect, useState} from "react";
import {Button, Table, TableHead, Checkbox} from "@material-ui/core";
import axios from "axios";
import habitTableActions from "../actions/habitTableActions"
import {useHistory} from "react-router-dom";


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
        habitTableActions.getHabits().then((data) => {
            setHabits(data.habit_data);
            //console.log("habits:")
            //console.log(habits);
        }).catch(function (error) {
            //console.log(error);
            history.push('/auth/login')
        });
    }

    const getHabitActions = () => {

    }

    useEffect(() =>{
        reloadHabits()
    }, []);

    const findHabit = (attribute, value) => {
        for (let [index, habit] of habits.entries()) {
            console.log(String(habit[attribute]));
            if (habit[attribute] == value) {
                return index;
            }
        }
        return -1;
    }

    const handleChange = (event) => {
        //send request with changes
            //add to date list somehow
        console.log(findHabit("habit_id", event.target.name));
        console.log(event.target);
        if (event.target.checked) {
            event.target.checked = false;
        } else {
            event.target.checked = true;
        }
    }

    return (
        <div>
               <table>
                    <thead>
                        <tr rowSpan="2">
                            <th rowSpan = "2">Habit ID</th>
                            <th rowSpan="2">Habit Name</th>
                            {dates.map((dt) => (
                                <th>
                                    <td>{dayRef[dt.getDay()]}</td>

                                </th>
                            ))}
                        </tr>
                        <tr>

                            {dates.map((dt) => (
                                <th>
                                    <td date={formatDate(dt)}>{dt.getDate() }</td>

                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {habits.map((h) => (
                        <tr>
                            <td>{h.habit_id}</td>
                            <td>{h.habit_title}</td>
                            {formatedDates.map((dt) => (
                                <td date={dt}>
                                    <Checkbox name={h.habit_id} value = {dt} checked ={h.habit_action.includes(dt) } onChange={handleChange}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
        </div>
    );
}
export default HabitTable;