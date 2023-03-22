import React, { useEffect, useState } from 'react';
import { ChangeSizeControl } from './components/ChangeSizeControl';
import detectTrash from './helpers/detectTrash';
import generateUpperZIndex from './helpers/generateUpperZIndex';
import { IStickyNote } from './../../models/StickyNote.interface';

export const StickyNote = ({ id, saveStickyNoteData, stickyNoteData }) => {
  const [noteDisplay, setNoteDisplay] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [editable, setEditable] = useState(false);
  const [zIndex, setZIndex] = useState('');
  const [size, setSize] = useState({
    width: 200,
    height: 200,
  });
  const [initialInnerPointerPosition, setInitialInnerPointerPosition] =
    useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stickyNoteData) {
      setZIndex(stickyNoteData.zIndex);
      setPosition(stickyNoteData.position);
      setSize(stickyNoteData.size);
      setNoteDisplay(stickyNoteData.visible);
    }
  }, [stickyNoteData]);

  const getUpperZIndex = () => {
    const upperZIndex = generateUpperZIndex();
    setZIndex(upperZIndex);
    saveStickyNoteData(id, {
      zIndex: upperZIndex,
    });
    return upperZIndex;
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    getUpperZIndex();
    setInitialInnerPointerPosition({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
    setEditable(false);

    event.dataTransfer.setData(
      'text/plain',
      'StickyNote' + event.currentTarget
    );
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);

    const trashElement = document.getElementById('trash');
    if (trashElement) {
      if (detectTrash(event.clientX, event.clientY)) {
        trashElement.style.backgroundColor = '#F00';
      } else {
        trashElement.style.backgroundColor = '#900';
      }
    }
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    if (!editable) {
      setPosition({
        x: event.clientX - initialInnerPointerPosition.x,
        y: event.clientY - initialInnerPointerPosition.y,
      });
    }
    if (detectTrash(event.clientX, event.clientY)) {
      setNoteDisplay(false);
    } else {
      setNoteDisplay(true);
    }
    saveStickyNoteData(id, {
      position: {
        x: event.clientX - initialInnerPointerPosition.x,
        y: event.clientY - initialInnerPointerPosition.y,
      },
      visible: !detectTrash(event.clientX, event.clientY),
    });
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    getUpperZIndex();
    setEditable(true);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setEditable(false);
    saveStickyNoteData(id, {
      text: event.target.innerText,
    });
  };

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    getUpperZIndex();
  };

  const handleSizeChange = (size) => {
    saveStickyNoteData(id, {
      size,
    });
  };

  return (
    <div
      draggable={!editable}
      onClick={handleOnClick}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      onBlur={handleOnBlur}
      style={{
        backgroundColor: stickyNoteData.color,
        border: dragging || editable ? 'solid 2px #000' : '',
        position: 'absolute',
        top: position.y,
        left: position.x,
        display: noteDisplay ? 'flex' : 'none',
        width: size.width + 'px',
        height: size.height + 'px',
        textAlign: 'center',
        minWidth: '100px',
        overflow: 'hidden',
        verticalAlign: 'middle',
        zIndex,

        boxShadow: '0px 6px 20px -8px rgba(0,0,0,0.75)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          contentEditable={editable}
        >
          {stickyNoteData?.text || ' '}
        </div>
        {editable && (
          <ChangeSizeControl
            {...{ size }}
            {...{ setSize }}
            {...{ handleSizeChange }}
          ></ChangeSizeControl>
        )}
      </div>
    </div>
  );
};
