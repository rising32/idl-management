import React from 'react';
import CompanyInfo from '../../components/account/CompanyInfo';
import UserInfo from '../../components/account/UserInfo';
import PageHeader from '../../components/base/PageHeader';

function AccountContainer() {
  return (
    <div className='grid gap-4'>
      <PageHeader className='text-rouge flex items-center justify-between p-3'>
        <div>Terms</div>
        <div className='font-bold'>Your Account</div>
        <div>Sign out</div>
      </PageHeader>
      <CompanyInfo />
      <UserInfo />
    </div>
  );
}

export default AccountContainer;
