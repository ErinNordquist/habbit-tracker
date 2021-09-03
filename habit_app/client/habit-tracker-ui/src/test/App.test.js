import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from "react-dom";
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


describe('my app', () => {
  test('loads title', () => {
  render(<App />);
  const titleText = screen.getByText(/Habit Tracker/i);
  expect(titleText).toBeInTheDocument();
  });
});

