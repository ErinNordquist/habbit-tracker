import {useState} from "react";
import {Button, Table} from "@material-ui/core";
import axios from "axios";




function HabitTable(props) {
    const [cells, setCells] = useState(0);
    const getPokemon = () => {
        axios.get("https://localhost:5000/home").then(
            (res) => {
                console.log(res)
                setCells(res)
            }
        )
    };

    return (
        <div>
            <Button onClick={getPokemon}>{cells}</Button>
        </div>
    );
}
export default HabitTable;