import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RoundedView from '../../components/common/RoundedView';
import { RootState } from '../../store';
import { Controller, useForm, SubmitHandler, useWatch } from 'react-hook-form';
import InputWithLabel from '../common/InputWithLabel';
import { itemGrayStyle } from '../../lib/utils/commonStyle';
import { getFormatDate, getLocalMonthList, getNickName } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import SelectDate from '../common/SelectDate';

export type ProfileFormType = {
  email: string;
  phone: string;
  first_name: string;
  name: string;
  nick_name: string;
  birthday: Date;
  billable_days: number[];
};

type Props = {
  onSubmit: SubmitHandler<ProfileFormType>;
  error: string | null;
};
function ProfileForm({ onSubmit, error }: Props) {
  const [billableSum, setBillableSum] = useState(240);
  const navigate = useNavigate();

  const { user, local } = useSelector((state: RootState) => state.core);
  const { handleSubmit, control, setValue } = useForm<ProfileFormType>({
    defaultValues: {
      email: user?.email || '',
      phone: user?.phone_number || '',
      first_name: '',
      name: user?.display_name || '',
      nick_name: '',
      billable_days: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      birthday: new Date(),
    },
  });
  const firstName = useWatch({
    control,
    name: 'first_name',
  });
  useEffect(() => {
    if (firstName) {
      setValue('nick_name', getNickName(firstName));
    }
  }, [firstName]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RoundedView className='bg-white py-4 px-1 grid gap-2 text-black'>
        <div className='flex justify-between px-6'>
          <div className='text-rouge' onClick={() => navigate(-1)}>
            Cancel
          </div>
          <div className='font-bold'>Edit Profile</div>
          <button type='submit' className='text-rouge'>
            Save
          </button>
        </div>
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
            <div className={itemGrayStyle}>
              <div className='uppercase mr-4'>{'nickname:'}</div>
              <div>{value}</div>
              {value && <div>(Automatic Suggestion)</div>}
            </div>
          )}
        />
        <Controller
          control={control}
          name='birthday'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <SelectDate label='birthday' fieldRef={ref} onChange={onChange} value={value} />
          )}
        />
        <div className={`font-bold ${itemGrayStyle}`}>
          <span className='uppercase mr-4'>{billableSum}</span>
          <span>Billable Days</span>
        </div>
        <Controller
          control={control}
          name='billable_days'
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, name, value, ref } }) => (
            <div>
              {getLocalMonthList(local).map((month, index) => (
                <div key={month} className='px-5 flex'>
                  <span className='text-rouge mr-2'>{value[index]}</span>
                  <div className='capitalize'>{month}</div>
                </div>
              ))}
            </div>
          )}
        />
      </RoundedView>
    </form>
  );
}

export default ProfileForm;
