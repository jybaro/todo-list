import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks.reducer';
import {
  setUser,
  deleteUser,
  showList,
  setStickyNotesData,
  deleteStickyNotesData,
} from './tasks.actions';
import { IStickyNote } from '../../models/interfaces/StickyNote.interface';
import { User } from '../../models/interfaces/user.interface';

describe('tasksReducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { tasks: tasksReducer } });
  });

  test('showList', () => {
    store.dispatch(showList(true));
    expect(store.getState().tasks.showedList).toBe(true);
  });

  test('setUser', () => {
    const user: User = {
      id: '1',
      name: 'John Doe',
      avatar: '',
      collectionId: '',
      collectionName: '',
      created: '',
      email: '',
      emailVisibility: true,
      updated: '',
      username: '',
      verified: false,
    };
    store.dispatch(setUser(user));
    expect(store.getState().tasks.user).toEqual(user);
  });

  test('deleteUser', () => {
    store.dispatch(deleteUser());
    expect(store.getState().tasks.user).toBeNull();
  });

  test('setStickyNotesData', () => {
    const stickyNotes: IStickyNote[] = [
      {
        id: 1,
        text: 'Note 1',
        color: 'Content 1',
        position: { x: 100, y: 100 },
        size: { width: 100, height: 100 },
        zIndex: '222',
        visible: true,
      },
      {
        id: 2,
        text: 'Note 2',
        color: 'Content 2',
        position: { x: 100, y: 100 },
        size: { width: 100, height: 100 },
        zIndex: '222',
        visible: true,
      },
    ];
    store.dispatch(setStickyNotesData(stickyNotes));
    expect(store.getState().tasks.stickyNotesData).toEqual(stickyNotes);
  });

  test('deleteStickyNotesData', () => {
    store.dispatch(deleteStickyNotesData());
    expect(store.getState().tasks.stickyNotesData).toEqual([]);
  });
});
