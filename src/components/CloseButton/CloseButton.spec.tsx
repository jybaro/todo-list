import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CloseButton } from './CloseButton';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('CloseButton', () => {
  test('renders the button and triggers the actions onClick', () => {
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <CloseButton />
      </Provider>
    );

    const buttonElement = screen.getByText('LOG OUT');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle({
      backgroundColor: '#000',
      color: '#CCC',
      borderRadius: '5px',
      padding: '5px',
      margin: '5px',
      width: '100px',
      fontWeight: 'bold',
    });

    fireEvent.click(buttonElement);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
