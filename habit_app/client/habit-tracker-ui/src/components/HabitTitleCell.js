import habitTableActions from "../actions/habitTableActions";
import '../css/HabitTable.css';
import {useState} from "react";
import {Button, Menu, MenuItem, TextField} from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';


function HabitTitleCell(props) {
    const habitID = props.habitID;
    const habitIndex = props.findHabit("habit_id",habitID);
    const habitTitle = props.habits[habitIndex].habit_title;
    let habits = Array.from(props.habits);
    const [textCell, setTextCell] = useState(habitTitle);
    let inputValue = habitTitle;

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            //console.log(inputValue);
            habitTableActions.updateHabitTitle(habitID, inputValue, props.history)
                .then((response) => {
                habits[habitIndex].habit_title = inputValue;
                setTextCell(habits[habitIndex].habit_title);
            })//.catch()
        } else {
            //handleChange(event);
        }
    }

    const handleChange = (event) => {
        const newTitle = event.target.value;
        inputValue = newTitle;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleEditPush = (event) => {
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

    const handleDeletePush = (event) => {
        habitTableActions.deleteHabit(props.habits[habitIndex].habit_id, props.history).then(() => {
            props.setHabits(props.habits.filter(item => item !== props.habits[habitIndex]));
            }
        );//.catch();
    }

    const [anchorEl, open] = useState(null);
    const handleClick = (event) => {
        open(event.currentTarget);
    };

    const handleClose = () => {
        open(null);
    };
    return (
        <>
            <td key={`EditButtonCell${habitID}`}>
                {/*<IconButton key={`EditButton${props.habitIndex}`} onClick={handleEditPush} >*/}
                {/*    <MoreVertIcon/>*/}
                {/*</IconButton>*/}
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon/>
                    </Button>
                    <Menu id={`Menu${habitID}`}
                        anchorEl={anchorEl}
                          anchorOrigin={{vertical:'bottom',horizontal:'right',}}
                          transformOrigin={{vertical: 'top', horizontal: 'right',}}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}>
                        <MenuItem onClick={handleEditPush}>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeletePush}>
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            </td>
            <td key={`HabitTitleCell${habitID}`}>
                {textCell}
            </td>
        </>
    )
}
export default HabitTitleCell;