import React from 'react';
import generateUpperZIndex from '../StickyNote/helpers/generateUpperZIndex';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectStickyNotesData,
  selectUser,
} from '../../reducers/tasks/tasks.selectors';
import { setStickyNotesData } from '../../reducers/tasks/tasks.actions';
import { TaskService } from '../../services/tasks.service';
import { useMutation, useQueryClient } from 'react-query';
import { Task } from '../../models/interfaces/task.interface';

export const AddButton = ({ color, label }) => {
  const stickyNotesData = useAppSelector(selectStickyNotesData);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const queryClient = useQueryClient();

  const mutation = useMutation(TaskService.createTask, {
    onSuccess: (data: Task | any, request) => {
      if (data.code && data.code !== 200) {
      } else {
        queryClient.invalidateQueries('stickyNotes');
        const newStickyNotesData = [
          ...stickyNotesData,
          {
            id: data.id,
            color: request.color,
            text: request.description,
            position: {
              x: request.left,
              y: request.top,
            },
            size: {
              width: request.width,
              height: request.height,
            },
            zIndex: request.zindex,
            visible: true,
          },
        ];

        dispatch(setStickyNotesData(newStickyNotesData));
      }
    },
    onError: () => {},
  });

  const handleOnClick = () => {
    mutation.mutate({
      description: '',
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      zindex: generateUpperZIndex(),
      color,
      done: false,
      deleted: false,
      owner: user.id,
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
