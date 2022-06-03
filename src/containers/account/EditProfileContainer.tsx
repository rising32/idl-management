import React, { useState } from 'react';
import ProfileForm, { ProfileFormType } from '../../components/account/ProfileForm';
import PageHeader from '../../components/base/PageHeader';
import { SubmitHandler } from 'react-hook-form';

function EditProfileContainer() {
  const [error, setError] = useState<null | string>(null);

  const onSubmit: SubmitHandler<ProfileFormType> = data => {
    setError(null);
  };
  return (
    <div className='grid gap-4'>
      <PageHeader className='flex items-center justify-between text-black'>
        <div></div>
        <div className='font-bold'>Your Account</div>
        <div></div>
      </PageHeader>
      <ProfileForm onSubmit={onSubmit} error={error} />
    </div>
  );
}

export default EditProfileContainer;
