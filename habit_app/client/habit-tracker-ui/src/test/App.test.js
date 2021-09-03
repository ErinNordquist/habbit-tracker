import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from "react-dom";
let container = null;

describe('my app', () => {
  test('loads title', () => {
  render(<App />);
  const titleText = screen.getByText(/Habit Tracker/i);
  expect(titleText).toBeInTheDocument();
  });
});

