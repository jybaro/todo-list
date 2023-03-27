import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { IStickyNote } from '../../models/interfaces/StickyNote.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectStickyNotesData,
  selectUser,
} from '../../reducers/tasks/tasks.selectors';

const columns: GridColDef[] = [
  { field: 'description', headerName: 'Description', width: 200 },
  {
    field: 'created',
    headerName: 'Created at',
    width: 180,
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.row.created).toLocaleString(),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.deleted ? 'DELETED' : params.row.done ? 'DONE' : 'PENDING',
  },
];

export const TaskList = () => {
  const stickyNotesData: IStickyNote[] = useAppSelector(selectStickyNotesData);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={stickyNotesData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
