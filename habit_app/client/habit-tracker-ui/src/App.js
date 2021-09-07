import './css/App.css';
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import {Drawer} from '@material-ui/core';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import AuthActions from "./actions/AuthActions";
import {StyledButton} from "./components/styles"

function App(props) {

  return (
    <div className="App">
        <header className="App-header" position="fixed">Habit Tracker</header>
        <BrowserRouter>
            <div className="Nav-container">
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
                        <StyledButton onClick={()=>{AuthActions.logout()}}>Log Out</StyledButton>
                    </Link>
                </Drawer>
            </div>
            <div className="Content-container">
                <Switch>
                    <Route path="/auth/create-account">
                        <CreateUserForm/>
                    </Route>
                    <Route  path="/auth/login" exact>
                        <LoginForm/>
                    </Route>
                    <Route path="/home">
                        <HomePage id={'homePageComponent'}/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    </div>

  );
}

export default App;
