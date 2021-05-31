import {Button} from "@material-ui/core";
import axios from "axios";

function NavBar(props) {

    const onClick = (route) => {
        console.log(`http://localhost:5000${route}`)
        const res = axios.get(`http://localhost:5000${route}`);
        console.log(res);
    }
    return (
        <div>Habit Tracker:
            <Button onClick= {() => onClick("/home")}>Home</Button>
            <Button onClick= {() => onClick("/auth/create-account")}>Create Account</Button>
            <Button onClick={() => onClick("/auth/login")}>Login</Button>
            <Button onClick={() => onClick("/auth/logout")}>Logout</Button>

        </div>
    );
}
export default NavBar;