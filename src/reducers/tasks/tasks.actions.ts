import { createAction } from '@reduxjs/toolkit';
import { IStickyNote } from '../../models/interfaces/StickyNote.interface';
import { User } from '../../models/interfaces/user.interface';

export const showList = createAction<boolean>('tasks/showList');
export const setUser = createAction<User | null>('tasks/setUser');
export const deleteUser = createAction('tasks/deleteUser');
export const setStickyNotesData = createAction<IStickyNote[]>(
  'tasks/setStickyNotesData'
);
export const deleteStickyNotesData = createAction(
  'tasks/deleteStickyNotesData'
);
