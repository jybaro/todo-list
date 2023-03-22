import React from 'react';

export const Trash = () => {
  return (
    <div
      id="trash"
      style={{
        backgroundColor: '#900',
        color: '#fff',
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '300px',
        height: '300px',
        borderRadius: '150px',
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
      >
        TRASH
      </div>
    </div>
  );
};
