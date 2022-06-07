import React from 'react';
import RoundedView from '../common/RoundedView';
import { ClientState } from '../../modules/client';
import { ProjectState } from '../../modules/project';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import InputWithLabel from '../common/InputWithLabel';
import { PlusSvg } from '../../assets/svg';
import SelectClient from '../client/SelectClient';
import SelectProject from '../project/SelectProject';
import DeliverableTab from './DeliverableTab';
import { TaskState } from '../../modules/task';
import SelectTask from '../task/SelectTask';

export interface IDeliverableFormInput {
  client: ClientState | null;
  project: ProjectState | null;
  task: TaskState | null;
  deliverable: string;
}

function DeliverableForm() {
  const { control, handleSubmit } = useForm<IDeliverableFormInput>({
    defaultValues: {
      client: null,
      project: null,
      task: null,
      deliverable: '',
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

  const onSubmit: SubmitHandler<IDeliverableFormInput> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-white mt-4'>
      <div className='text-center'>Priority achieved this week with clear goal defined</div>
      <RoundedView className='border-4 border-rouge bg-gray p-4 pb-12 relative'>
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
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <InputWithLabel
              label='Deliverable'
              fieldRef={ref}
              onBlur={onBlur}
              name={name}
              onChange={onChange}
              placeholder='Enter Deliverable Name'
              value={value}
            />
          )}
        />
        <button
          type='submit'
          className='bg-white w-8 h-8 rounded-full shadow-xl items-center justify-center flex absolute bottom-4 right-4'
        >
          <PlusSvg className='w-6 h-6 text-rouge' />
        </button>
        <DeliverableTab />
      </RoundedView>
    </form>
  );
}

export default DeliverableForm;
