import React from 'react';
import { documentThumbnail } from '../../assets/images';
import { XMarkSvg } from '../../assets/svg';

interface Props {
  isSelected?: boolean;
  isCompleted?: boolean;
}
const CompltedIcon = ({ isCompleted, isSelected }: Props) => {
  return (
    <div className='w-6 h-6 flex items-center justify-center relative mr-2'>
      <img src={documentThumbnail} className='w-5 h-5' />
      {isCompleted ? (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <XMarkSvg className='w-3 h-3 text-rouge' />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default CompltedIcon;
