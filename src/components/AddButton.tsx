import React from 'react';
import generateUpperZIndex from './StickyNote/helpers/generateUpperZIndex';
import { IStickyNote } from './../models/StickyNote.interface';

export const AddButton = ({ setStickyNotesData, color, label }) => {
  const handleOnClick = () => {
    setStickyNotesData((stickyNotesData: IStickyNote[]) => {
      return [
        ...stickyNotesData,
        {
          id: stickyNotesData.length,
          color,
          text: '',
          position: {
            x: 0,
            y: 0,
          },
          size: {
            width: 200,
            height: 200,
          },
          zIndex: generateUpperZIndex(),
          visible: true,
        },
      ];
    });
  };
  return (
    <button
      style={{
        backgroundColor: color,
        borderRadius: '5px',
        padding: '5px',
        margin: '5px',
        width: '100px',
      }}
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
};
