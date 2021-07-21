import habitTableActions from "../actions/habitTableActions";
import '../css/HabitTable.css';
import {useState} from "react";
import {Button, IconButton, Menu, MenuItem, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HabitEditMenu from "./HabitEditMenu.js"

function HabitTitleCell(props) {
    const habitIndex = props.habitIndex;
    let habits = Array.from(props.habits);
    const [textCell, setTextCell] = useState(props.habits[habitIndex].habit_title);
    let inputValue = props.habits[habitIndex].habit_title;

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            //console.log(inputValue);
            habitTableActions.updateHabitTitle(habits[habitIndex].habit_id, inputValue, props.history)
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

    const [anchorEl, open] = useState(null);
    const handleClick = (event) => {
        open(event.currentTarget);
    };

    const handleClose = () => {
        open(null);
    };
    return (
        <>
            <td key={`EditButtonCell${props.habitIndex}`}>
                {/*<IconButton key={`EditButton${props.habitIndex}`} onClick={handleEditPush} >*/}
                {/*    <MoreVertIcon/>*/}
                {/*</IconButton>*/}
                <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon/>
                    </Button>
                    <Menu id={`Menu${props.habitIndex}`}
                        anchorEl={anchorEl}
                          anchorOrigin={{vertical:'bottom',horizontal:'right',}}
                          transformOrigin={{vertical: 'top', horizontal: 'right',}}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}>
                        <MenuItem onClick={handleEditPush}>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={()=>{}}>
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            </td>
            <td key={`HabitTitleCell${props.habitIndex}`}>
                {textCell}
            </td>
        </>
    )
}
export default HabitTitleCell;