import { IStickyNote } from '../models/StickyNote.interface';

export const useBackendStorage = (data: IStickyNote[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => resolve('{"code":"200","message":"Saved succesfully"}'),
      3000
    );
  });
};
