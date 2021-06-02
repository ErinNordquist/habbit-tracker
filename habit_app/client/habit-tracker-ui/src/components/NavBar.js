import {Button} from "@material-ui/core";
import axios from "axios";
import Routes from "../Routes";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";


function NavBar(props) {
    const onClick = (route) => {
        console.log(`http://localhost:5000${route}`)
        axios.get(`http://localhost:5000${route}`).then(function (response){
            console.log(response);
        });

    }
    return (
        <div>Habit Tracker:
            <Button onClick= {() => onClick("/")}>Home</Button>
            <Button onClick= {() => onClick("/auth/create-account")}>Create Account</Button>
            <Button onClick={() => onClick("/auth/login")}>Login</Button>
            <Button onClick={() => onClick("/auth/logout")}>Logout</Button>

        </div>
    );
}
export default NavBar;