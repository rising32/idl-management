import React from 'react';
import { RectangleFillOnRectangleFillSvg, XMarkSvg } from '../../assets/svg';

interface Props {
  isSelected?: boolean;
  isCompleted?: boolean;
}
const CompltedIcon = ({ isCompleted, isSelected }: Props) => {
  return (
    <div className='w-6 h-6 flex items-center justify-center relative'>
      <RectangleFillOnRectangleFillSvg className='w-6 h-6' />
      {!isCompleted ? (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
          <XMarkSvg className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-rouge'}`} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default CompltedIcon;
