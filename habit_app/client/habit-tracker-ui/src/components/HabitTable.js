import CreateHabitForm from "./CreateHabitForm";
import HabitTableRows from "./HabitTableRows";
import {Typography, Box} from '@material-ui/core';
import '../css/HabitTable.css';

function HabitTable(props) {
    return (
        <div id = "HabitTableDiv">
               <table id='HabitTable'>
                    <thead>
                        <tr rowSpan="1" id="HeaderRow1">
                            <th rowSpan = "1" id="HabitIDHeader"></th>
                            <th rowSpan="1" id="HabitNameHeader">Habit</th>
                            {props.dates.map((dt, index) => (
                                <th key = {`day${index}Header`}>
                                    <Box>
                                        <Typography variant="body2">{props.dayRef[dt.getDay()]}</Typography>
                                        <Typography variant="body1">{dt.getDate()}</Typography>
                                    </Box>
                                </th>))}
                        </tr>
                    </thead>
                    <HabitTableRows habits={props.habits} setHabits={props.setHabits}
                                    formattedDates={props.formattedDates} history={props.history}/>
                    <tfoot>
                        <CreateHabitForm habits = {props.habits}
                                         setHabits = {props.setHabits}
                                         history={props.history}/>
                    </tfoot>
                </table>
        </div>
    );
}
export default HabitTable;