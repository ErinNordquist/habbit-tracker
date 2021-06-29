import {Button, Drawer, withStyles} from "@material-ui/core";

export const StyledButton = withStyles({
    root:{
        background: "black",
        borderRadius: 3,
        border: 1,
        color: 'white',
        height: 36,
        padding: '10px 10px',
        borderBlockColor:'white',
    },
    label: {
        textTransform: 'capitalize',
        color:'white',
    },
})(Button);

export const StyledDrawer = withStyles({
    root:{
        //background:"black",
        //color: "black",
    },
})(Drawer);
