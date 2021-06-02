import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {Button} from "@material-ui/core";
//import HabitTable from "./components/HabitTable";
import Routes from './Routes';
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="App">
        <BrowserRouter>
            <nav>

                <Link to="/auth/create-account">
                    <Button>Create Account</Button>
                </Link>
                <Link to="/auth/login">
                    <Button>Login</Button>
                </Link>

            </nav>
            <Switch>
                <Route path="/auth/create-account">
                    <CreateUserForm/>
                </Route>
                <Route path="/auth/login" exact>
                    <LoginForm/>
                </Route>
            </Switch>
        </BrowserRouter>
      <header className="App-header">
        <NavBar></NavBar>
      </header>
    </div>

  );
}

export default App;
