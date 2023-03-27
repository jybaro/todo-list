import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const stickyNotesData = [
  {
    id: 1,
    description: 'Task 1',
    color: 'yellow',
    text: 'Sample Text 1',
    position: { x: 100, y: 100 },
    size: { width: 200, height: 200 },
    zIndex: '1',
    visible: true,
    created: new Date().toISOString(),
    done: false,
    deleted: false,
  },
  {
    id: 2,
    description: 'Task 2',
    color: 'blue',
    text: 'Sample Text 2',
    position: { x: 200, y: 200 },
    size: { width: 200, height: 200 },
    zIndex: '2',
    visible: true,
    created: new Date().toISOString(),
    done: true,
    deleted: false,
  },
];

describe('TaskList', () => {
  beforeEach(() => {
    jest.spyOn(store, 'getState').mockImplementation(() => ({
      tasks: {
        stickyNotesData,
        user: {},
        showList: false,
      },
    }));
  });

  test('renders the TaskList with provided data', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    stickyNotesData.forEach((stickyNote) => {
      expect(screen.getByText(stickyNote.description)).toBeInTheDocument();
    });
  });
});
