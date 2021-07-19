import {useEffect, useState} from "react";
import habitTableActions from "../actions/habitTableActions"
import {useHistory} from "react-router-dom";
import CreateHabitForm from "./CreateHabitForm";
import HabitTableRows from "./HabitTableRows";
import {Slide, Card, CardContent, Typography, Box} from '@material-ui/core';
import '../css/HabitTable.css';

function HabitTable(props) {
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

    const [formattedDates, setFormattedDates] = useState(dates.map(formatDate));

    let history = useHistory();

    const reloadHabits = () => {
        habitTableActions.getHabits(formattedDates[0],formattedDates[6], history).then((response) => {
            let data = response.data
            setHabits(data.habit_data);
            //console.log(habits);
        }).catch(function (error) {
            //console.log(JSON.stringify(error))
            //log out if unauthorized (expired token)
            if (error.response.status === 401) {
                props.logOutUser()
                history.push('/auth/login')
            }
        });
    }

    useEffect(() =>{
        reloadHabits()
    },[]);

    return (
        <div id = "HabitTableDiv">
               <table id='HabitTable'>
                    <thead>
                        <tr rowSpan="1" id="HeaderRow1">
                            <th rowSpan = "1" id="HabitIDHeader"></th>
                            <th rowSpan="1" id="HabitNameHeader">Habit</th>
                            {dates.map((dt, index) => (
                                <th key = {`day${index}Header`}>
                                    <Box>
                                        <Typography variant="body2">{dayRef[dt.getDay()]}</Typography>
                                        <Typography variant="body1">{dt.getDate()}</Typography>
                                    </Box>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <HabitTableRows habits={habits} setHabits={setHabits}
                                    formattedDates={formattedDates} history={history}/>
                    <tfoot>
                        <CreateHabitForm habits = {habits} setHabits = {setHabits} history={history}/>
                    </tfoot>
                </table>
        </div>
    );
}
export default HabitTable;