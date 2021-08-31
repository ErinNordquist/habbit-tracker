import {useState} from "react";
import {Button, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

function HabitEditMenu(props) {
    const [anchorEl, open] = useState(null);
    const handleClick = (event) => {
        open(event.currentTarget);
    };

    const handleClose = () => {
        open(null);
    };
    return (
      <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon/>
          </Button>
          <Menu anchorEl={anchorEl}
                anchorOrigin={{horizontal: 'right',}}
                transformOrigin={{horizontal: 'right',}}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
              <MenuItem onClick={()=>{}}>
                  Edit
              </MenuItem>
              <MenuItem onClick={()=>{}}>
                  Delete
              </MenuItem>
          </Menu>
      </div>
    );
}
export default HabitEditMenu;