import React, { useEffect, useState } from 'react';
import { ChangeSizeControl } from './components/ChangeSizeControl/ChangeSizeControl';
import detectZone from './helpers/detectZone';
import generateUpperZIndex from './helpers/generateUpperZIndex';
import { colors } from '../../constants/colors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IStickyNote } from '../../models/interfaces/StickyNote.interface';
import { selectStickyNotesData } from '../../reducers/tasks/tasks.selectors';
import { TaskService } from '../../services/tasks.service';
import { setStickyNotesData } from '../../reducers/tasks/tasks.actions';
import { useMutation, useQueryClient } from 'react-query';

export const StickyNote = ({ id, stickyNoteData }) => {
  const [noteDisplay, setNoteDisplay] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [editable, setEditable] = useState(false);
  const [zIndex, setZIndex] = useState('');
  const [size, setSize] = useState({
    width: 200,
    height: 200,
  });
  const [initialInnerPointerPosition, setInitialInnerPointerPosition] =
    useState({ x: 0, y: 0 });

  const stickyNotesData: IStickyNote[] = useAppSelector(selectStickyNotesData);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(TaskService.updateTask, {
    onSuccess: (data: any) => {
      if (data.code && data.code !== 200) {
      } else {
        saveStickyNoteData(data);
        queryClient.invalidateQueries('stickyNotes');
      }
    },
    onError: () => {},
  });

  useEffect(() => {
    if (stickyNoteData) {
      setZIndex(stickyNoteData.zIndex);
      setPosition(stickyNoteData.position);
      setSize(stickyNoteData.size);
      setNoteDisplay(stickyNoteData.visible);
    }
  }, [stickyNoteData]);

  const getUpperZIndex = () => {
    const upperZIndex = generateUpperZIndex();
    setZIndex(upperZIndex);

    mutation.mutate({
      id,
      zindex: upperZIndex,
    });
    return upperZIndex;
  };

  const saveStickyNoteData = (data) => {
    const newStickyNotesData = stickyNotesData.map((stickyNoteData) => {
      if (stickyNoteData.id === data.id) {
        return {
          ...stickyNoteData,
          ...data,
        };
      }
      return stickyNoteData;
    });

    dispatch(setStickyNotesData(newStickyNotesData));
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement> | any) => {
    getUpperZIndex();
    setInitialInnerPointerPosition({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
    setEditable(false);

    event.dataTransfer.setData(
      'text/plain',
      'StickyNote' + event.currentTarget
    );
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);

    const doneElement = document.getElementById('done');
    if (doneElement) {
      if (detectZone({ x: event.clientX, y: event.clientY, id: 'done' })) {
        doneElement.style.backgroundColor = colors.doneLight;
      } else {
        doneElement.style.backgroundColor = colors.doneDark;
      }
    }

    const trashElement = document.getElementById('trash');
    if (trashElement) {
      if (detectZone({ x: event.clientX, y: event.clientY, id: 'trash' })) {
        trashElement.style.backgroundColor = colors.trashLight;
      } else {
        trashElement.style.backgroundColor = colors.trashDark;
      }
    }
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    if (!editable) {
      setPosition({
        x: event.clientX - initialInnerPointerPosition.x,
        y: event.clientY - initialInnerPointerPosition.y,
      });
    }
    if (detectZone({ x: event.clientX, y: event.clientY, id: 'done' })) {
      setNoteDisplay(false);
    } else if (
      detectZone({ x: event.clientX, y: event.clientY, id: 'trash' })
    ) {
      setNoteDisplay(false);
    } else {
      setNoteDisplay(true);
    }

    mutation.mutate({
      id,
      top: event.clientY - initialInnerPointerPosition.y,
      left: event.clientX - initialInnerPointerPosition.x,
      deleted: !!detectZone({
        x: event.clientX,
        y: event.clientY,
        id: 'trash',
      }),
      done: !!detectZone({ x: event.clientX, y: event.clientY, id: 'done' }),
    });
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    getUpperZIndex();
    setEditable(true);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setEditable(false);

    mutation.mutate({
      id,
      description: event.target.innerText,
    });
  };

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    getUpperZIndex();
  };

  const handleSizeChange = (size) => {
    mutation.mutate({
      id,
      ...size,
    });
  };

  return (
    <div
      draggable={!editable}
      onClick={handleOnClick}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      onBlur={handleOnBlur}
      style={{
        backgroundColor: stickyNoteData.color,
        border: dragging || editable ? 'solid 2px #000' : '',
        position: 'absolute',
        top: position.y,
        left: position.x,
        display: noteDisplay ? 'flex' : 'none',
        width: size.width + 'px',
        height: size.height + 'px',
        textAlign: 'center',
        minWidth: '100px',
        overflow: 'hidden',
        verticalAlign: 'middle',
        zIndex,

        boxShadow: '0px 6px 20px -8px rgba(0,0,0,0.75)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          contentEditable={editable}
        >
          {stickyNoteData?.text || ' '}
        </div>
        {editable && (
          <ChangeSizeControl
            {...{ size }}
            {...{ setSize }}
            {...{ handleSizeChange }}
          ></ChangeSizeControl>
        )}
      </div>
    </div>
  );
};
