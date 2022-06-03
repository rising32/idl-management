import React from 'react';
import CompanyInfo from '../../components/account/CompanyInfo';
import PageHeader from '../../components/base/PageHeader';

function AccountContainer() {
  return (
    <div className='grid gap-4'>
      <PageHeader className='text-rouge flex items-center justify-between p-3'>
        <div>Terms</div>
        <div className='font-bold'>Your ACCOUNT</div>
        <div>Sign out</div>
      </PageHeader>
      <CompanyInfo />
    </div>
  );
}

export default AccountContainer;
