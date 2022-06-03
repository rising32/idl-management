import React, { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

function ConditionalBackground() {
  const location = useLocation();
  const isGray = useMemo(
    () => [{ path: '/', exact: true }, '/recent', '/lists'].some(path => matchPath(path, location.pathname)),
    [location],
  );
  return <>{isGray ? <div /> : <div />}</>;
}

export default ConditionalBackground;
