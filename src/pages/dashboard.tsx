import React, { useEffect, useState } from 'react';
import { AddButton } from '../components/AddButton';
import { SaveButton } from '../components/SaveButton';
import { StickyNote } from '../components/StickyNote';
import { Trash } from '../components/Trash';
import { IStickyNote } from './../models/StickyNote.interface';

export default function Dashboard() {
  const [stickyNotesData, setStickyNotesData] = useState<IStickyNote[]>([]);

  useEffect(() => {
    const json = localStorage.getItem('stickyNotesData') || '[]';
    const data = JSON.parse(json);
    setStickyNotesData(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('stickyNotesData', JSON.stringify(stickyNotesData));
  }, [stickyNotesData]);

  const saveStickyNoteData = (id, data) => {
    setStickyNotesData((stickyNotesData) => {
      return stickyNotesData.map((stickyNoteData) => {
        if (stickyNoteData.id === id) {
          return {
            ...stickyNoteData,
            ...data,
          };
        }
        return stickyNoteData;
      });
    });
  };

  return (
    <>
      <h1>Sticky notes</h1>
      <AddButton {...{ setStickyNotesData }} color="#FF9" label="Add yellow" />
      <AddButton {...{ setStickyNotesData }} color="#9FF" label="Add blue" />
      <AddButton {...{ setStickyNotesData }} color="#F99" label="Add red" />
      <SaveButton {...{ stickyNotesData }} />
      {stickyNotesData.map((stickyNoteData) => (
        <StickyNote
          key={stickyNoteData.id}
          id={stickyNoteData.id}
          {...{ saveStickyNoteData }}
          {...{ stickyNoteData }}
        />
      ))}
      <Trash />
    </>
  );
}
