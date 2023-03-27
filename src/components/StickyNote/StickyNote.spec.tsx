import React from 'react';
import { render, screen } from '@testing-library/react';
import { StickyNote } from './StickyNote';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const stickyNoteData = {
  id: 1,
  color: 'yellow',
  text: 'Sample Text',
  position: {
    x: 100,
    y: 100,
  },
  size: {
    width: 200,
    height: 200,
  },
  zIndex: '1',
  visible: true,
};

describe('StickyNote', () => {
  test('renders the StickyNote with provided data', () => {
    render(
      <Provider store={store}>
        <StickyNote id={stickyNoteData.id} stickyNoteData={stickyNoteData} />
      </Provider>
    );

    const stickyNoteElement = screen.getByText(stickyNoteData.text);
    expect(stickyNoteElement).toBeInTheDocument();
  });
});
