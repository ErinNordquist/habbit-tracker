import {useState} from "react";

function HabitActionTable(props) {
    console.log(props.habits);
    return (
        <table>
            <thead>
                <tr>
                    <th>Habit</th>
                    <th>Habit Action Date</th>
                </tr>
            </thead>
            <tbody>
            {props.habits.map((hbt, index) => (
                hbt['habit_action'].map((hbt_actn)=>(
                <tr>
                    <td>{hbt['habit_title']}</td>
                    <td>{hbt_actn}</td>
                </tr>
                ))
            ))}
            </tbody>
        </table>
    );
}
export default HabitActionTable;