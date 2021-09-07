import {TextField, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {useState} from "react";
import habitTableActions from "../actions/habitTableActions"
import '../css/HabitTable.css';

function CreateHabitForm(props) {
    const [textInput, setTextInput] = useState("")
    const [value, setValue] = useState("")
    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            //console.log(props.habits);
            habitTableActions.addHabit(event.target.value, props.history).then((response) => {
                    response.data['habit_action'] = []
                    console.log(response.data);
                    setTextInput(null);
                    props.setHabits(props.habits.concat(response.data));
                }

            ).catch()

        } else {
            handleChange(event);
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <tr>
            <td>
                <Button color="primary" size="small" aria-label="add" onClick=
                    {(event) => {
                        if (textInput !== ""){
                            setTextInput("");
                        } else {
                            setTextInput(
                                <form onSubmit={(event) => {
                                    event.preventDefault();
                                }}>
                                    <TextField id="new-habit"
                                               label="New Habit" variant="filled"
                                               onKeyUp={handleKeyUp}
                                               onChange={handleChange}/>
                                </form>
                                );}
                    }}>
                    <AddIcon/>
                </Button>
            </td>
            <td className="HabitTitleCell">{textInput}</td>
        </tr>
    );
}
export default CreateHabitForm;