import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { IStickyNote } from '../../models/interfaces/StickyNote.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectStickyNotesData,
  selectUser,
} from '../../reducers/tasks/tasks.selectors';
import { useQuery } from 'react-query';
import { TaskService } from './../../services/tasks.service';
import { Task } from '../../models/interfaces/task.interface';

const columns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.description ? params.row.description : '<EMPTY>',
  },
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

interface ITaskListArgs {
  tasks: Task[];
}
export const TaskList = (props: ITaskListArgs) => {
  // const stickyNotesData: IStickyNote[] = useAppSelector(selectStickyNotesData);
  const { tasks } = props;
  const user = useAppSelector(selectUser);
  const { data: stickyNotesData } = useQuery(
    ['stickyNotes', user?.id ?? ''],
    TaskService.getAll,
    {
      enabled: !!user && !!user.id,
    }
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      {stickyNotesData ? (
        <DataGrid
          // rows={stickyNotesData}
          rows={tasks}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      ) : (
        ''
      )}
    </div>
  );
};
