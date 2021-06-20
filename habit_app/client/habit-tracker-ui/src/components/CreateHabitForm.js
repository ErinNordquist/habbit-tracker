import {Fab, TextField} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {useState} from "react";
import habitTableActions from "../actions/habitTableActions"

function CreateHabitForm(props) {
    const [textInput, setTextInput] = useState()
    const [value, setValue] = useState("")
    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            console.log(event.target.value);
            habitTableActions.addHabit(event.target.value).then((response) => {
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
    //
    return (
        <tr>
            <td>
                <Fab color="primary" size="small" aria-label="add" onClick=
                    {(event) => {
                        setTextInput(
                            <td>
                                <form onSubmit={(event) => {event.preventDefault();}}>
                                    <TextField id="new-habit"
                                                label="New Habit" variant="filled"
                                                onKeyUp={handleKeyUp}
                                                onChange={handleChange}/>
                                </form>
                            </td>);
                    }}>
                    <AddIcon/>
                </Fab>
            </td>
            {textInput}
        </tr>
    );
}
export default CreateHabitForm;