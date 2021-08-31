import './css/App.css';
import {useState} from "react";
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import {AppBar,Drawer} from '@material-ui/core';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AuthActions from "./actions/AuthActions";
import {StyledButton, StyledDrawer} from "./components/styles"

function App(props) {
    //AuthActions.logout();
    //console.log(AuthActions.getCurrentUser());
    //const [user, setUser] = useState();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           AuthActions.getCurrentUser());
    const [loggedIn, setLoggedIn] = useState(AuthActions.getCurrentUser() !== null);

    const logInUser = () => {
        //setUser(username);
        setLoggedIn(AuthActions.getCurrentUser() !== null);
    }
    const logOutUser = () => {
        AuthActions.logout();
        setLoggedIn(AuthActions.getCurrentUser() !== null);
    }

  return (
    <div className="App">
        <header class="App-header" position="fixed">Habit Tracker</header>
        <BrowserRouter>
            <div class="Nav-container">
                <Drawer variant="permanent" anchor="left" classes={{root:"Nav-container"}} PaperProps={{ className: "Nav-container" }}>
                    <Link to="/auth/create-account" >
                        <StyledButton>Create Account</StyledButton>
                    </Link>
                    <Link to="/auth/login">
                        <StyledButton>Login</StyledButton>
                    </Link>
                    <Link to="/home">
                        <StyledButton>Home</StyledButton>
                    </Link>
                    <Link to="/auth/login">
                        <StyledButton onClick={logOutUser}>Log Out</StyledButton>
                    </Link>
                </Drawer>
            </div>
            <div class="Content-container">
                <Switch>
                    <Route path="/auth/create-account">
                        <CreateUserForm/>
                    </Route>
                    <Route  path="/auth/login" exact>
                        <LoginForm logInUser = {logInUser} loggedIn={loggedIn}/>
                    </Route>
                    <Route path="/home">
                        <HomePage loggedIn = {loggedIn} logOutUser={logOutUser}/>
                    </Route>

                </Switch>
            </div>
        </BrowserRouter>
    </div>

  );
}

export default App;
