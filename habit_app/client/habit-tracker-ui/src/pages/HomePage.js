import HabitTable from "../components/HabitTable";


function HomePage(props) {

    return (
        <HabitTable loggedIn = {props.loggedIn} logOutUser={props.logOutUser}/>
    );
}
export default HomePage;