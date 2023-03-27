import { RootState } from '../../store/store';

export const selectShowedList = (state: RootState) => state.tasks.showedList;
export const selectUser = (state: RootState) => state.tasks.user;
export const selectStickyNotesData = (state: RootState) =>
  state.tasks.stickyNotesData;
