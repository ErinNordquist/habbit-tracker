import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from "react-dom";
import LoginForm from "../components/LoginForm";
import AuthActions from "../actions/AuthActions";
let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('login page',() =>{
    test('loads title', () => {
        render(<LoginForm loggedIn={new Boolean(false)}/>);
        const loginTitle = screen.getByText(/Login/i);
        expect(loginTitle).toBeInTheDocument();
    });
});