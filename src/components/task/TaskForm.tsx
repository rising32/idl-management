import React from 'react';
import { Controller, useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { PlusSvg } from '../../assets/svg';
import { ClientState } from '../../modules/client';
import RoundedView from '../common/RoundedView';
import SelectClient from '../client/SelectClient';
import SelectProject from '../project/SelectProject';
import { ProjectState } from '../../modules/project';
import { TaskState } from '../../modules/task';
import SelectTask from './SelectTask';
import { UserInfoState } from '../../modules/user';
import SelectMember from '../member/SelectMember';
import SelectDate from '../common/SelectDate';

export type TaskFormType = {
  client: ClientState | null;
  project: ProjectState | null;
  task: TaskState | null;
  deliverable: string;
  member: UserInfoState | null;
  when: Date | null;
};

type Props = {
  onSubmit: SubmitHandler<TaskFormType>;
  error: string | null;
};
function TaskForm({ onSubmit, error }: Props) {
  const { handleSubmit, control } = useForm<TaskFormType>({
    defaultValues: {
      client: null,
      project: null,
      task: null,
      deliverable: '',
      member: null,
      when: null,
    },
  });
  const client = useWatch({
    control,
    name: 'client',
  });
  const project = useWatch({
    control,
    name: 'project',
  });

  return (
    <RoundedView className='border-2 border-rouge bg-gray'>
      <form onSubmit={handleSubmit(onSubmit)} className='text-white mt-4 pb-12 relative'>
        <Controller
          control={control}
          name='client'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <SelectClient fieldRef={ref} name={name} onBlur={onBlur} onChange={onChange} value={value} />
          )}
        />
        <Controller
          control={control}
          name='project'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <SelectProject fieldRef={ref} name={name} onBlur={onBlur} client={client} onChange={onChange} value={value} />
          )}
        />
        <Controller
          control={control}
          name='task'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <SelectTask fieldRef={ref} name={name} onBlur={onBlur} project={project} onChange={onChange} value={value} />
          )}
        />
        <Controller
          control={control}
          name='deliverable'
          rules={{ required: false }}
          render={({ field }) => (
            <label className='w-full flex items-center px-2'>
              <span>Deliverable:</span>
              <input
                type='text'
                autoComplete='off'
                className='ml-2 py-2 bg-transparent focus:outline-none focus:border-none flex border-none w-full'
                placeholder='Enter Deliverable Name'
                {...field}
              />
            </label>
          )}
        />
        <Controller
          control={control}
          name='member'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <SelectMember fieldRef={ref} name={name} onBlur={onBlur} onChange={onChange} value={value} />
          )}
        />
        <Controller
          control={control}
          name='when'
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => <SelectDate label='when' fieldRef={ref} onChange={onChange} value={value} />}
        />
        <button
          type='submit'
          className='bg-white w-8 h-8 rounded-full shadow-xl items-center justify-center flex absolute bottom-4 right-4'
        >
          <PlusSvg className='w-6 h-6 text-rouge' />
        </button>
      </form>
    </RoundedView>
  );
}

export default TaskForm;
