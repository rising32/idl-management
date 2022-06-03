import React from 'react';

export type StatusCodeProps = {
  statusCode: number;
};

function StatusCode({ statusCode }: StatusCodeProps) {
  return <div>{statusCode}</div>;
}

export default StatusCode;
