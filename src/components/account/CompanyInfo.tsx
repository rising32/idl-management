import React from 'react';
import { useSelector } from 'react-redux';
import { BriefCaseFillSvg, GearFillSvg, HouseCircleFillSvg, Person3FillSvg, PersonFillSvg } from '../../assets/svg';
import ItemWithArrow from '../../components/common/ItemWithArrow';
import RoundedView from '../../components/common/RoundedView';
import { RootState } from '../../store';

function CompanyInfo() {
  const { admin_info, member_count, company_name } = useSelector((state: RootState) => state.companyInfo);
  return (
    <RoundedView className='bg-white text-black py-4 px-1 grid gap-2'>
      <div className='text-center font-bold'>COMPANY PROFILE</div>
      <ItemWithArrow Icon={PersonFillSvg}>
        <div className='font-bold'>{admin_info?.display_name}</div>
        <div className='flex flex-1 items-center justify-center'>{admin_info?.email}</div>
      </ItemWithArrow>
      <ItemWithArrow Icon={HouseCircleFillSvg}>
        <div className='font-bold'>Organization</div>
        <div className='flex flex-1 items-center justify-center'>{company_name}</div>
      </ItemWithArrow>
      <ItemWithArrow Icon={BriefCaseFillSvg}>
        <div className='font-bold'>Work setting</div>
        <div className='flex flex-1 items-center justify-center'>AM/PM</div>
      </ItemWithArrow>
      <ItemWithArrow Icon={GearFillSvg}>
        <div className='font-bold'>Date / Hours</div>
        <div className='flex flex-1 items-center justify-center'>5/7</div>
      </ItemWithArrow>
      <ItemWithArrow Icon={Person3FillSvg}>
        <div className='font-bold'>Project User</div>
        <div className='flex flex-1 items-center justify-center'>{member_count}</div>
      </ItemWithArrow>
    </RoundedView>
  );
}

export default CompanyInfo;
