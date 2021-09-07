import HabitTable from "../components/HabitTable";
import HabitActionTable from "../components/HabitActionTable";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import habitTableActions from "../actions/habitTableActions";
import AuthActions from "../actions/AuthActions";


function HomePage(props) {
    const [habits,setHabits] = useState([]);
    const minusDays = (date, days) => {
        date.setDate(date.getDate() - days);
        return date;
    }

    const [dates, setDates] = useState([minusDays(new Date(), 6),
        minusDays(new Date(), 5),
        minusDays(new Date(), 4),
        minusDays(new Date(), 3),
        minusDays(new Date(), 2),
        minusDays(new Date(), 1),
        minusDays(new Date(), 0)
    ]);

    const dayRef = ['Su','M',"Tu","W","Th","F","Sa"];
    const formatDate = (dt) => {
        return String(dt.getFullYear())+"-"+
            String(dt.getMonth()+1).padStart(2, 0)+ "-"+
            String(dt.getDate()).padStart(2, 0);
    }

    const [formattedDates, setFormattedDates] = useState(dates.map(formatDate));

    let history = useHistory();

    const reloadHabits = () => {
        habitTableActions.getHabits(history).then((response) => {
            let data = response.data
            setHabits(data.habit_data);
        }).catch(function (error) {
            //log out if unauthorized (expired token)
            if (error.response.status === 401) {
                AuthActions.logout();
                history.push('/auth/login');
            }
        });
    }
    useEffect(() =>{
        reloadHabits()
    });

    return (
        <div id="HomePageDiv">
            <HabitTable
                id = "habitTableComponent"
                habits={habits}
                setHabits={setHabits}
                dates={dates}
                setDates={setDates}
                formattedDates={formattedDates}
                setFormattedDates={setFormattedDates}
                dayRef={dayRef}
                history={history}
            />
            <HabitActionTable
                habits={habits}
                setHabits={habits}
                dates={dates}
                setDates={setDates}
                formattedDates={formattedDates}
                setFormattedDates={setFormattedDates}
                dayRef={dayRef}
                history={history}
            />
        </div>
    );
}
export default HomePage;
