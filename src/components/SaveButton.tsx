import React, { useState } from 'react';
import { useBackendStorage } from '../hooks/useBackendStorage';

export const SaveButton = ({ stickyNotesData }) => {
  const [loading, setLoading] = useState(false);
  const handleOnClick = async () => {
    setLoading(true);
    const json: string = await useBackendStorage(stickyNotesData);
    const data = JSON.parse(json);
    setLoading(false);
  };

  return (
    <>
      <button
        style={{
          backgroundColor: '#CCC',
          borderRadius: '5px',
          padding: '5px',
          margin: '5px',
          width: '100px',
        }}
        onClick={handleOnClick}
        disabled={loading}
      >
        {loading ? 'SAVING...' : 'SAVE'}
      </button>
    </>
  );
};
