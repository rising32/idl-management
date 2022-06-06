import React from 'react';
import { useSelector } from 'react-redux';
import { PriorityContext } from '../../containers/priority/MainPriorityContainer';
import { sendPriorityByWeek } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { RootState, useAppDispatch } from '../../store';
import RoundedView from '../common/RoundedView';
import { ClientState } from '../../modules/client';
import { ProjectState } from '../../modules/project';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import InputWithLabel from '../common/InputWithLabel';
import { PlusSvg } from '../../assets/svg';
import PriorityTab from './PriorityTab';
import SelectClient from '../client/SelectClient';
import SelectProject from '../project/SelectProject';

export interface IPriorityFormInput {
  priority: string;
  goal: string;
  detail: string;
  weekly: number;
  client: ClientState | null;
  project: ProjectState | null;
}

function PriorityForm() {
  const { control, handleSubmit } = useForm<IPriorityFormInput>({
    defaultValues: {
      priority: '',
      goal: '',
      detail: '',
      weekly: 1,
      client: null,
      project: null,
    },
  });

  const [_sendPriorityByWeek, , sendPriorityByWeekRes] = useRequest(sendPriorityByWeek);
  const dispatch = useAppDispatch();
  const { state } = React.useContext(PriorityContext);
  const { user } = useSelector((state: RootState) => state.core);

  const client = useWatch({
    control,
    name: 'client',
  });

  const onSubmit: SubmitHandler<IPriorityFormInput> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='text-white mt-4'>
      <div className='text-center'>Priority achieved this week with clear goal defined</div>
      <RoundedView className='border-4 border-rouge bg-gray p-4 pb-12 relative'>
        <Controller
          control={control}
          name='priority'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <InputWithLabel
              label='priority'
              fieldRef={ref}
              onBlur={onBlur}
              name={name}
              onChange={onChange}
              placeholder='Enter Priority Name'
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name='goal'
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <InputWithLabel
              label='goal'
              fieldRef={ref}
              onBlur={onBlur}
              name={name}
              onChange={onChange}
              placeholder='Enter Goal'
              value={value}
            />
          )}
        />
        {state.tab && (
          <Controller
            control={control}
            name='detail'
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, name, value, ref } }) => (
              <InputWithLabel
                label='detail'
                fieldRef={ref}
                onBlur={onBlur}
                name={name}
                onChange={onChange}
                placeholder='Enter Detail'
                value={value}
              />
            )}
          />
        )}
        {state.tab === 'PROJECT' && (
          <>
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
          </>
        )}
        <button
          type='submit'
          className='bg-white w-8 h-8 rounded-full shadow-xl items-center justify-center flex absolute bottom-4 right-4'
        >
          <PlusSvg className='w-6 h-6 text-rouge' />
        </button>
        <PriorityTab />
      </RoundedView>
    </form>
  );
}

export default PriorityForm;
