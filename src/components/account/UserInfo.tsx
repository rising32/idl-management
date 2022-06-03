import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronDownCircleFillSvg, HouseSvg, PersonFillSvg, ProjectSvg } from '../../assets/svg';
import ItemWithoutArrow from '../../components/common/ItemWithoutArrow';
import RoundedView from '../../components/common/RoundedView';
import { RootState } from '../../store';

function UserInfo() {
  const { client_count, project_count, task_count } = useSelector((state: RootState) => state.companyInfo);
  const { user } = useSelector((state: RootState) => state.core);
  const navigate = useNavigate();

  return (
    <RoundedView className='bg-gray1 text-rouge1 py-4 px-1 grid gap-2'>
      <div className='text-center font-bold text-black'>MEMBER PROFILE</div>
      <ItemWithoutArrow Icon={PersonFillSvg} onClick={() => navigate('edit-profile')}>
        <span className='mr-1'>{user?.display_name}</span>
        <span>{user?.email}</span>
      </ItemWithoutArrow>
      <ItemWithoutArrow Icon={HouseSvg}>
        <span className='mr-1'>{client_count}</span>
        <span>Clients</span>
      </ItemWithoutArrow>
      <ItemWithoutArrow Icon={ProjectSvg}>
        <span className='mr-1'>{project_count}</span>
        <span>Projects</span>
      </ItemWithoutArrow>
      <ItemWithoutArrow Icon={ChevronDownCircleFillSvg}>
        <span className='mr-1'>{task_count}</span>
        <span>Tasks</span>
      </ItemWithoutArrow>
    </RoundedView>
  );
}

export default UserInfo;
