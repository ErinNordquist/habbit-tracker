import habitTableActions from "../actions/habitTableActions";
import '../css/HabitTable.css';
import {useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function HabitTitleCell(props) {
    const habitIndex = props.habitIndex;
    let habits = Array.from(props.habits);
    const [textCell, setTextCell] = useState(props.habits[habitIndex].habit_title);
    let inputValue = props.habits[habitIndex].habit_title;

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            //console.log(inputValue);
            habitTableActions.updateHabitTitle(habits[habitIndex].habit_id, inputValue)
                .then((response) => {
                habits[habitIndex].habit_title = inputValue;
                setTextCell(habits[habitIndex].habit_title);
            })//.catch()
        } else {
            //handleChange(event);
        }
    }

    const handleChange = (event) => {
        //event.preventDefault();
        //console.log(event.target);
        //console.log(event.target.value);
        const newTitle = event.target.value;
        console.log(newTitle);
        inputValue = newTitle;
        //while(inputValue != newTitle){}
        console.log(inputValue);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // //send request to api
        // event.preventDefault();
        // //console.log(inputValue);
        // habitTableActions.updateHabitTitle(habits[habitIndex].habit_id, inputValue).then((response) => {
        //     habits[habitIndex].habit_title = inputValue;
        //     setTextArea(habits[habitIndex].habit_title);
        //     props.setHabits(habits);
        // })

    }
    const handleEditPush = (event) => {
        //console.log(event.target);
        if (!textCell.type) {
            setTextCell(
                <form onSubmit={handleSubmit}>
                    <TextField id={`ChangeName${event.target.value}`}
                               key={`ChangeName${event.target.value}`}
                               defaultValue={props.habits[habitIndex].habit_title}
                               onChange={handleChange}
                               onKeyUp={handleKeyUp}
                               name="newName"

                    />
                </form>);
        } else {
            setTextCell(habits[habitIndex].habit_title);
        }
        //props.setHabits(habits);

    }
    return (
        <>
            <td key={`EditButtonCell${props.habitIndex}`}>
                <IconButton key={`EditButton${props.habitIndex}`} onClick={handleEditPush} >
                    <EditIcon/>
                </IconButton>
            </td>
            <td key={`HabitTitleCell${props.habitIndex}`}>
                {textCell}
            </td>
        </>
    )
}
export default HabitTitleCell;