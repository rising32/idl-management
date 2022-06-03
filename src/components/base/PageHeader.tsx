import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function PageHeader({ children, className }: Props): JSX.Element {
  return <section className={`bg-white flex p-2 rounded-xl ${className}`}>{children}</section>;
}

export default PageHeader;
