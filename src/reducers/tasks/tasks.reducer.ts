import { createReducer } from '@reduxjs/toolkit';
import { IStickyNote } from '../../models/interfaces/StickyNote.interface';
import { User } from '../../models/interfaces/user.interface';

import {
  setUser,
  deleteUser,
  showList,
  setStickyNotesData,
  deleteStickyNotesData,
} from './tasks.actions';

interface TaskState {
  showedList: boolean;
  user: User | null;
  stickyNotesData: IStickyNote[];
}

const initialState: TaskState = {
  showedList: false,
  user: null,
  stickyNotesData: [],
};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(showList, (state, action) => ({
    ...state,
    showedList: action.payload,
  }));

  builder.addCase(setUser, (state, action) => ({
    ...state,
    user: action.payload,
  }));
  builder.addCase(deleteUser, (state) => ({
    ...state,
    user: null,
  }));

  builder.addCase(setStickyNotesData, (state, action) => ({
    ...state,
    stickyNotesData: action.payload,
  }));
  builder.addCase(deleteStickyNotesData, (state) => ({
    ...state,
    stickyNotesData: [],
  }));
});
