import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RoundedView from '../../components/common/RoundedView';
import { RootState } from '../../store';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { string } from 'yup';
import InputWithLabel from '../common/InputWithLabel';
import { itemGrayStyle } from '../../lib/utils/commonStyle';

export type ProfileFormType = {
  email: string;
  phone: string;
  first_name: string;
  name: string;
  nick_name: string;
  birthday: string;
  billable_days: number[];
};

type Props = {
  onSubmit: SubmitHandler<ProfileFormType>;
  error: string | null;
};
function ProfileForm({ onSubmit, error }: Props) {
  const [billableSum, setBillableSum] = useState(240);
  const { user } = useSelector((state: RootState) => state.core);
  const { handleSubmit, control } = useForm<ProfileFormType>({
    defaultValues: {
      email: '',
      phone: '',
      first_name: '',
      name: '',
      nick_name: '',
      billable_days: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      birthday: '',
    },
  });

  return (
    <RoundedView className='bg-white py-4 px-1 grid gap-2'>
      <div className='text-center font-bold text-black'>Edit Profile</div>
      <Controller
        control={control}
        name='email'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <InputWithLabel
            label='Email'
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter Email'
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='phone'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <InputWithLabel
            label='phone'
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter phone'
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='first_name'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <InputWithLabel
            label='firstname'
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter first name'
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='name'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <InputWithLabel
            label='name'
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter name'
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='nick_name'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <InputWithLabel
            label='nickname'
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter nick name'
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='birthday'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <InputWithLabel
            label='birthday'
            fieldRef={ref}
            onBlur={onBlur}
            name={name}
            onChange={onChange}
            placeholder='Enter nick name'
            value={value}
          />
        )}
      />
      <div className={`font-bold ${itemGrayStyle}`}>
        <span className='uppercase mr-4'>{billableSum}</span>
        <span>Billable Days</span>
      </div>
    </RoundedView>
  );
}

export default ProfileForm;
