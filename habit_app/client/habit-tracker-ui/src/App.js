import logo from './logo.svg';
import './App.css';
//import {Button} from "@material-ui/core";
//import HabitTable from "./components/HabitTable";
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar></NavBar>
      </header>
        <CreateUserForm></CreateUserForm>
        <LoginForm></LoginForm>
    </div>

  );
}

export default App;
