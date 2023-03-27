import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddButton } from './AddButton';
import { Provider } from 'react-redux';
import { store } from './../../store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TaskService } from '../../services/tasks.service';

jest.mock('../../services/tasks.service');

const queryClient = new QueryClient();

describe('AddButton', () => {
  beforeEach(() => {
    (TaskService.createTask as jest.Mock).mockClear();
  });

  test('renders the button and triggers the mutation onClick', () => {
    const testColor = 'red';
    const testLabel = 'Add Sticky Note';

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AddButton color={testColor} label={testLabel} />
        </QueryClientProvider>
      </Provider>
    );

    const buttonElement = screen.getByText(testLabel);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle({ backgroundColor: testColor });

    fireEvent.click(buttonElement);
    expect(TaskService.createTask).toHaveBeenCalledTimes(1);
  });
});
