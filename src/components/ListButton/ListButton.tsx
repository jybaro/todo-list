import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { showList } from '../../reducers/tasks/tasks.actions';

export const ListButton = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(showList(true));
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
      >
        TASKS LIST
      </button>
    </>
  );
};
