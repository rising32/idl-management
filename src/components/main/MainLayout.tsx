import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomTab from './BottomTab';

function MainLayout() {
  return (
    <div className='w-screen h-screen flex flex-col text-xs'>
      <Outlet />
      <BottomTab />
    </div>
  );
}

export default MainLayout;
