import React from 'react';
import { PlusSvg } from '../../assets/svg';

interface Props {
  className?: string;
}
function PlusIcon({ className }: Props) {
  return (
    <div className={className}>
      <div className='flex items-center justify-center bg-white w-8 h-8 rounded-full outline outline-1 shadow-xl'>
        <PlusSvg className='w-6 h-6 stroke-rouge fill-rouge' />
      </div>
    </div>
  );
}

export default PlusIcon;
