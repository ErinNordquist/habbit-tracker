import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as axios from "axios";
import HomePage from "../pages/HomePage";
import HabitTable from "../components/HabitTable";
import habitTableActions from "../actions/habitTableActions";
import "../setupTests";
import mount from "enzyme/src/mount";



const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

// describe('home page',()=> {
//     test('loads page', () => {
//         render(<HomePage/>)
//
//     })
//
// })

var mockHabits = [{"habit_id": 33, "habit_title":"habit 1", "habit_action":["2020-01-04","2020-01-06"]},
    {"habit_id":36,"habit_title":"habit 2", "habit_action":["2020-01-03", "2020-01-06","2020-01-07"]},
    {"habit_id":37,"habit_title":"habit 3","habit_action":[]}
];

// const dayRef = ['Su','M',"Tu","W","Th","F","Sa"];
// const formatDate = (dt) => {
//     return String(dt.getFullYear())+"-"+
//         String(dt.getMonth()+1).padStart(2, 0)+ "-"+
//         String(dt.getDate()).padStart(2, 0);
// }
// const mockHistory = null;
// const dates = [,new Date(2020,0,2)
//     ,new Date(2020,0,3)
//     ,new Date(2020,0,4)
//     ,new Date(2020,0,5)
//     ,new Date(2020,0,6)
//     ,new Date(2020,0,7)
//     ,new Date(2020,0,8)]
// const formattedDates = dates.map(formatDate);
// const setHabits=jest.fn(newHabits => mockHabits = newHabits);
// const setDates=jest.fn();
// const history = jest.fn();

jest.spyOn(habitTableActions,"getHabits").mockImplementation(()=>
     Promise.resolve({status:200, data: mockHabits}));
// jest.mock('../actions/habitTableActions', () => ({
//     //...jest.requireActual('react-router-dom'),
//     getHabits: () => (Promise.resolve(
//         {status: 200, data: mockHabits}))
// }));

describe('habit table',()=> {
    test('shows dates', () => {
        const wrapper = mount(<HomePage/>)
        expect('Tu').toBeInTheDocument();
        //console.log(document.getElementById("homePageComponent"));
        //console.log(wrapper.prop('dates'));
    })

})