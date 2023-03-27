import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { deleteUser, showList } from '../../reducers/tasks/tasks.actions';

export const CloseButton = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(showList(false));
    dispatch(deleteUser());
  };

  return (
    <>
      <button
        style={{
          backgroundColor: '#000',
          color: '#CCC',
          borderRadius: '5px',
          padding: '5px',
          margin: '5px',
          width: '100px',
          fontWeight: 'bold',
        }}
        onClick={handleOnClick}
      >
        LOG OUT
      </button>
    </>
  );
};
