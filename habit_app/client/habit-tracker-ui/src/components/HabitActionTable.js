
function HabitActionTable(props) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Habit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {props.habits.map((hbt, index) => (
                hbt['habit_action'].map((hbt_actn)=>(
                <tr key={`habitActionRow${hbt}${hbt_actn}`}>
                    <td key={`habitActionTitleCell${hbt}${hbt_actn}`}>{hbt['habit_title']}</td>
                    <td key={`habitActionCell${hbt}${hbt_actn}`}>{hbt_actn}</td>
                </tr>))))}
            </tbody>
        </table>
    );
}
export default HabitActionTable;