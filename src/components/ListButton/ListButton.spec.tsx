import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListButton } from './ListButton';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('ListButton', () => {
  test('renders the button and triggers the action onClick', () => {
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <ListButton />
      </Provider>
    );

    const buttonElement = screen.getByText('TASKS LIST');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle({
      backgroundColor: '#CCC',
      borderRadius: '5px',
      padding: '5px',
      margin: '5px',
      width: '100px',
    });

    fireEvent.click(buttonElement);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
