import React, { useEffect, useState } from 'react';

export const ChangeSizeControl = ({ size, setSize, handleSizeChange }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [initialInnerPointerPosition, setInitialInnerPointerPosition] =
    useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setInitialSize(size);
  }, []);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setInitialPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setPosition((position) => ({
      x: event.clientX,
      y: event.clientY,
    }));
    setInitialInnerPointerPosition({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
    setInitialSize(size);

    event.dataTransfer.setData(
      'text/plain',
      'ChangeSizeControl' + event.currentTarget
    );
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDragging(true);
    setPosition((position) => ({
      x: event.clientX,
      y: event.clientY,
    }));

    const deltaSize = {
      width: event.clientX - initialPosition.x,
      height: event.clientY - initialPosition.y,
    };
    const size = {
      width: initialSize.width + deltaSize.width,
      height: initialSize.height + deltaSize.height,
    };
    setSize(size);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDragging(false);
    setPosition((position) => ({
      x: event.clientX,
      y: event.clientY,
    }));
    const deltaSize = {
      width: event.clientX - initialPosition.x,
      height: event.clientY - initialPosition.y,
    };
    const size = {
      width: initialSize.width + deltaSize.width,
      height: initialSize.height + deltaSize.height,
    };
    setSize(size);
    handleSizeChange(size);
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        bottom: '0',
        right: '0',
        backgroundColor: '#000',
        cursor: 'nwse-resize',
      }}
    ></div>
  );
};
