import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';


const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('my app', () => {
  test('loads title', () => {
  render(<App />);
  const titleText = screen.getByText(/Habit Tracker/i);
  expect(titleText).toBeInTheDocument();
  });
});

