import React, { useState } from 'react';
import { PriorityContext } from '../../containers/priority/MainPriorityContainer';

function WeeklyPriorities() {
  const { state, update } = React.useContext(PriorityContext);

  const onSelectWeek = () => {
    update({ ...state, selectedWeek: state.selectedWeek + 1 });
    // console.log('-----', state);
  };
  return (
    <div>
      <div>{state.selectedWeek}</div>
      <button onClick={onSelectWeek}>Test</button>
    </div>
  );
}

export default WeeklyPriorities;
