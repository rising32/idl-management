import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function RoundedView({ children, className }: Props): JSX.Element {
  return <div className={`shadow-lg rounded-xl ${className}`}>{children}</div>;
}

export default RoundedView;
