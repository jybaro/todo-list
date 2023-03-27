import React, { useEffect, useState } from 'react';
import { AddButton } from '../components/AddButton/AddButton';
import { ListButton } from '../components/ListButton/ListButton';
import { StickyNote } from '../components/StickyNote';
import { Zone } from '../components/Zone/Zone';
import { colors } from '../constants/colors';
import { CloseButton } from '../components/CloseButton/CloseButton';
import {
  selectShowedList,
  selectUser,
} from '../reducers/tasks/tasks.selectors';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  deleteStickyNotesData,
  showList,
} from '../reducers/tasks/tasks.actions';
import { TaskService } from '../services/tasks.service';
import { useQuery } from 'react-query';
import { Box, Modal, Typography } from '@mui/material';
import generateUpperZIndex from '../components/StickyNote/helpers/generateUpperZIndex';
import { TaskList } from '../components/TaskList/TaskList';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 540,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const openModal = useAppSelector(selectShowedList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navigate && dispatch) {
      if (user === null) {
        dispatch(deleteStickyNotesData());
        navigate('/');
      } else {
      }
    }
  }, [user, navigate, dispatch]);

  const { data: stickyNotes } = useQuery(
    ['stickyNotes', user?.id ?? ''],
    TaskService.getAll,
    {
      enabled: !!user && !!user.id,
    }
  );

  const handleCloseModal = () => dispatch(showList(false));

  return (
    <>
      <h1>Pending tasks</h1>
      <AddButton color="#FF9" label="Add yellow" />
      <AddButton color="#9FF" label="Add blue" />
      <AddButton color="#F99" label="Add red" />
      <ListButton />
      <CloseButton />

      {stickyNotes && stickyNotes.items && stickyNotes.items.map
        ? stickyNotes.items.map((data) => (
            <StickyNote
              key={data.id}
              id={data.id}
              stickyNoteData={{
                id: data.id,
                position: {
                  x: data.left,
                  y: data.top,
                },
                visible: !data.deleted && !data.done,
                size: {
                  width: data.width,
                  height: data.height,
                },
                text: data.description,
                color: data.color,
                zIndex: data.zindex,
              }}
            />
          ))
        : ''}
      <Zone
        id="done"
        label="DONE"
        style={{
          backgroundColor: colors.doneDark,
        }}
      />
      <Zone
        id="trash"
        label="TRASH"
        style={{
          backgroundColor: colors.trashDark,
          left: '0',
        }}
      />
      <Modal
        open={!!openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: generateUpperZIndex() }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task list
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TaskList />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
