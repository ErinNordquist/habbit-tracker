import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from "react-dom";
import LoginForm from "../components/LoginForm";

//import setupTest from "./setupTests";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

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