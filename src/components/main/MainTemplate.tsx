import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}
function MainTemplate({ className, children }: Props) {
  return <div className={`h-full w-full overflow-auto px-4 pt-4 text-white text-base ${className}`}>{children}</div>;
}

export default MainTemplate;
