import React from 'react';

interface IZone {
  id: string;
  label: string;
  style: React.CSSProperties;
}

export const Zone = (props: IZone) => {
  const { id, label, style } = props;
  return (
    <div
      id={id}
      style={{
        backgroundColor: '#900',
        color: '#fff',
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '300px',
        height: '300px',
        borderRadius: '150px',
        ...style,
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
        {label}
      </div>
    </div>
  );
};
