import {Checkbox} from "@material-ui/core";
//import EditIcon from "@material-ui/icons/Edit";
import habitTableActions from "../actions/habitTableActions";
import '../css/HabitTable.css';
import HabitTitleCell from "./HabitTitleCell";

function HabitTableRows(props) {
    const findHabit = (attribute, value) => {
        for (let [index, habit] of props.habits.entries()) {
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
        if (props.habits[habitIndex].habit_action.includes(event.target.value)) {
            index = props.habits[habitIndex].habit_action.indexOf(event.target.value);
        }
        //send request to backend to make change in database
        const promise =
            habitTableActions.updateHabitAction(event.target.name,event.target.value, (index>-1 ? 'delete' : 'add'));
        //once we get a successful response, modify the info on the front end to match what is now in the db
        promise.then((response) => {
            let newHabits = JSON.parse(JSON.stringify(props.habits));
            if (index > -1){
                newHabits[habitIndex].habit_action.splice(index, 1);
            } else {
                newHabits[habitIndex].habit_action.push(event.target.value);
            }
            props.setHabits(newHabits);
        });
    }

    return (
        <tbody id='HabitTableRows' >
            {props.habits.map((h, index) => (
                <tr key={`HabitRow${index}`}>
                    <HabitTitleCell key={`HabitTitle${index}`}
                                    //value={h.habit_title}
                                    habits = {props.habits}
                                    setHabits={props.setHabits}
                                    habitIndex = {index}/>
                    {props.formattedDates.map((dt) => (
                        <td date={dt} key={`HabitAction_${dt}_${index}`}>
                            <Checkbox name={h.habit_id} value = {dt} checked ={h.habit_action.includes(dt) } onClick={handleChange}/>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>

    );
}
export default HabitTableRows;