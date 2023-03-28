import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { showList } from '../../reducers/tasks/tasks.actions';
import generateUpperZIndex from '../StickyNote/helpers/generateUpperZIndex';

interface ListButtonArgs {
  setZIndexModal: () => void;
}

export const ListButton = (props) => {
  const { setZIndexModal } = props;
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(showList(true));
    setZIndexModal(generateUpperZIndex());
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
