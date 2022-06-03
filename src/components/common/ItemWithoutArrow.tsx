import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  onClick?: () => void;
}

function ItemWithoutArrow({ children, className, Icon, onClick }: Props): JSX.Element {
  return (
    <div className={`flex p-2 rounded-sm overflow-hidden items-center ${className}`} onClick={onClick}>
      <Icon className='h-4 w-4 object-cover' />
      <div className='flex flex-1 truncate mx-2'>{children}</div>
    </div>
  );
}

export default ItemWithoutArrow;
