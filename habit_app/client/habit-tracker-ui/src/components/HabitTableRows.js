import {Button, Checkbox} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import habitTableActions from "../actions/habitTableActions";


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
        let action = 'add';
        if (props.habits[habitIndex].habit_action.includes(event.target.value)) {
            index = props.habits[habitIndex].habit_action.indexOf(event.target.value);
            action = 'delete';
        }
        //send request to backend to make change in database
        const promise = habitTableActions.updateHabitAction(event.target.name,event.target.value, action);
        //once we get a successful response, modify the info on the front end to match what is now in the db
        const dataPromise = promise.then((response) => {
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
        <tbody>
            {props.habits.map((h, index) => (
                <tr key={`HabitRow${index}`}>
                    <td key={`HabitID${index}`}>
                        <Button>
                            <EditIcon/>
                        </Button>
                    </td>
                    <td key={`HabitTitle${index}`}>{h.habit_title}</td>
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