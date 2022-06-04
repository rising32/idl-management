import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useRequest from '../../lib/hooks/useRequest';
import { sendCreateTask, sendUpdateTask } from '../../lib/api';
import { RootState, useAppDispatch } from '../../store';
import FullInputWithLabel from '../common/FullInputWithLabel';
import { setLayer } from '../../store/features/coreSlice';
import { changeTaskCount } from '../../store/features/companySlice';
import { ProjectState } from '../../modules/project';
import { toast } from 'react-toastify';
import { TaskState } from '../../modules/task';

interface ICreateProjectForm {
  name: string;
  description: string;
  rate: number;
}
type Props = {
  value?: string | null;
  selectedTask?: TaskState;
  onCancel: () => void;
  onSuccess: (task: TaskState) => void;
  selectedProject: ProjectState | null;
};

const CreateTask = ({ value, selectedProject, selectedTask, onCancel, onSuccess }: Props) => {
  const { user } = useSelector((state: RootState) => state.core);
  const { company_id } = useSelector((state: RootState) => state.companyInfo);

  const [_sendCreateTask, , createTaskRes] = useRequest(sendCreateTask);
  const [_sendUpdateTask, , sendUpdateTaskRes] = useRequest(sendUpdateTask);
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<ICreateProjectForm>({
    defaultValues: {
      name: value || selectedTask?.task_name || '',
      description: selectedTask?.description || '',
      rate: selectedTask?.hourly_rate || 30,
    },
  });
  const onCreateProjectSubmit: SubmitHandler<ICreateProjectForm> = data => {
    dispatch(setLayer(true));
    if (selectedTask) {
      _sendUpdateTask({ ...selectedTask, task_name: data.name, description: data.description, hourly_rate: data.rate });
    } else {
      if (selectedProject?.project_id && user?.user_id) {
        const newTask = {
          task_id: null,
          creator_id: user.user_id,
          project_id: selectedProject.project_id,
          task_name: data.name,
          description: data.description,
          hourly_rate: data.rate,
          is_add_all: false,
          is_active: true,
          is_deleted: 0,
          company_id: company_id,
        };
        _sendCreateTask(newTask);
      } else {
        toast.error('please select project!');
      }
    }
  };
  React.useEffect(() => {
    if (createTaskRes) {
      onSuccess(createTaskRes.task);
      dispatch(changeTaskCount());
    }
  }, [createTaskRes]);
  React.useEffect(() => {
    if (sendUpdateTaskRes) {
      onSuccess(sendUpdateTaskRes);
    }
  }, [sendUpdateTaskRes]);

  return (
    <form onSubmit={handleSubmit(onCreateProjectSubmit)} className='w-full'>
      <div className='text-center font-bold'>{selectedProject ? 'Edit this task' : 'Create a new task'}</div>

      <Controller
        control={control}
        name='name'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <FullInputWithLabel
            label='name'
            onBlur={onBlur}
            name={name}
            fieldRef={ref}
            value={value}
            onChange={onChange}
            placeholder='Enter Task Name'
          />
        )}
      />
      <Controller
        control={control}
        name='description'
        // rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <FullInputWithLabel
            label='description'
            onBlur={onBlur}
            name={name}
            fieldRef={ref}
            value={value}
            onChange={onChange}
            placeholder='Enter Description'
          />
        )}
      />
      <Controller
        control={control}
        name='rate'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <FullInputWithLabel
            label='name'
            onBlur={onBlur}
            name={name}
            fieldRef={ref}
            value={value}
            onChange={onChange}
            placeholder='Enter Hourly Rate'
          />
        )}
      />
      <div className='flex justify-between w-full px-8 pt-4 text-lg font-bold'>
        <div onClick={onCancel}>No</div>
        <button type='submit' className='text-rouge font-bold'>
          Yes
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
