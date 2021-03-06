import React from 'react';
import { ForwardSvg } from '../../assets/svg';

interface Props {
  children: React.ReactNode;
  className?: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

function ItemWithArrow({ children, className, Icon }: Props): JSX.Element {
  return (
    <div className={`bg-light-gray flex p-2 rounded-sm overflow-hidden items-center ${className}`}>
      <Icon className='h-4 w-4 object-cover' />
      <div className='flex flex-1 truncate mx-2'>{children}</div>
      <ForwardSvg className='h-4 w-4' />
    </div>
  );
}

export default ItemWithArrow;
