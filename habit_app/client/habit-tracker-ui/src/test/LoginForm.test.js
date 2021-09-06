import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as axios from "axios";
import LoginForm from "../components/LoginForm";
import MemoryRouter from "react-router-dom";


//import setupTest from "./setupTests";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

jest.mock("axios");



describe('login form',()=>{
    test('saves token and redirects', () =>{
        axios.post.mockImplementationOnce(()=>Promise.resolve(
            {status: 200, data:{"access_token":"XXXXXXX"}}));
        render(//<MemoryRouter>
                <LoginForm history={}/>
            //<MemoryRouter>
        );
        const usernameInput = document.getElementById('loginUserTextField');//  getByLabelText('Username');
        act(()=>{fireEvent.change(usernameInput,{target:{value:'user'}})});
        expect(usernameInput.value).toBe('user');

        const passwordInput = document.getElementById('loginPassTextField');//screen.getByLabelText('Password');
        act(()=>{fireEvent.change(passwordInput,{target:{value:'pass'}})});
        expect(passwordInput.value).toBe('pass');

        const button = document.getElementById('loginSubmitButton');//screen.getAllByRole('button');
        expect(button).toBeInTheDocument();

        act(()=>{fireEvent.click(button)});
        expect(JSON.parse(localStorage.getItem("user"))).toBeDefined();
        //console.log(mockHistoryPush.mock.calls.length);

        console.log(document.body.innerHTML);
        expect(mockHistoryPush).toHaveBeenCalledWith('/home');


    });

    test('does not redirect on error', () =>{
        axios.post.mockImplementationOnce(()=>Promise.resolve(
            {status: 200, data:{"error":"Wrong username"}}));
        render(<LoginForm/>);
        const usernameInput = document.getElementById('loginUserTextField');//  getByLabelText('Username');
        fireEvent.change(usernameInput,{target:{value:'user'}});
        expect(usernameInput.value).toBe('user');

        const passwordInput = document.getElementById('loginPassTextField');//screen.getByLabelText('Password');
        fireEvent.change(passwordInput,{target:{value:'pass'}});
        expect(passwordInput.value).toBe('pass');

        const button = document.getElementById('loginSubmitButton');//screen.getAllByRole('button');
        console.log(button.innerHTML);
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(JSON.parse(localStorage.getItem("user"))).toBe(null);//   Defined();
        expect(mockHistoryPush).not.toBeCalledWith('/home');
    });
});

describe('login page',() =>{
    test('loads title', () => {
        render(<LoginForm/>);
        const loginTitle = screen.getByText(/Login/i);
        expect(loginTitle).toBeInTheDocument();
    });

    test('redirects if logged in', () => {
        localStorage.setItem("user", JSON.stringify("testUser"));
        render(<LoginForm />);
        expect(mockHistoryPush).toHaveBeenCalledWith('/home');
    });
});


/*{
    "error": "Wrong username"
}
{
    "error": "Wrong username/password combination"
}
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDcwNTU3NSwianRpIjoiNmNmMzQzMDYtMGUyNi00Y2ExLThlMTAtMGY4YWQ0YzU4ZDlhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Ind3dyIsIm5iZiI6MTYzMDcwNTU3NSwiZXhwIjoxNjMwNzA2NDc1fQ.EXxXihIBoMuA9wOybsTYdzm_v_CT2J6MQsT6Om3GAsg"
}
*/
