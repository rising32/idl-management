import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}
function MainTemplate({ className, children }: Props) {
  const wholeClassName = 'h-full w-full overflow-auto px-4 pt-4 text-white ' + className;

  return <div className={wholeClassName}>{children}</div>;
}

export default MainTemplate;
