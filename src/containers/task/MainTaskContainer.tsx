import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TaskCalendar from '../../components/task/TaskCalendar';
import TaskForm, { TaskFormType } from '../../components/task/TaskForm';
import { createCtx } from '../../lib/context/createCtx';
import { RootState } from '../../store';

interface TaskInterface {
  selectedDate: Date;
}
const defaultTaskInterface: TaskInterface = {
  selectedDate: new Date(),
};

const [ctx, TaskProvider] = createCtx(defaultTaskInterface);
export const TaskContext = ctx;

function MainTaskContainer() {
  const { user } = useSelector((state: RootState) => state.core);

  const onSubmit: SubmitHandler<TaskFormType> = data => {
    if (user?.role_id === 3) {
      toast.error('permission denied');
      return;
    }
    console.log(data);
  };
  return (
    <TaskProvider>
      <TaskCalendar />
      <TaskForm onSubmit={onSubmit} />
    </TaskProvider>
  );
}

export default MainTaskContainer;
