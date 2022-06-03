import React from 'react';
import { getNavLinkList } from '../../modules/NavLinkList';
import NavItem from './NavItem';

function BottomTab() {
  const navLinkList = getNavLinkList();
  return (
    <div className='bg-white flex flex-row items-center justify-evenly mx-4 mt-4 mb-6 rounded-t-xl overflow-hidden'>
      {navLinkList.map(nav => (
        <div key={nav.pathName} className='py-2'>
          <NavItem item={nav} />
        </div>
      ))}
    </div>
  );
}

export default BottomTab;
