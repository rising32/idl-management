import React from 'react';
import { DeliverableContext, DELIVERABLETABLIST } from '../../containers/deliverable/MainDeliverableContainer';

function DeliverableTab() {
  const { state, update } = React.useContext(DeliverableContext);

  const onSelectTab = (index: number) => {
    if (state.tab === DELIVERABLETABLIST[index]) {
      update({ ...state, tab: null });
    } else {
      update({ ...state, tab: DELIVERABLETABLIST[index] });
    }
  };
  return (
    <div className='absolute -bottom-1 left-0 w-full flex flex-row justify-evenly items-center text-xs'>
      {['Details', 'File', 'Picture', 'Screenshot', 'Expenses'].map((item, index) => (
        <div
          key={item}
          className={`rounded-t-md px-2 ${state.tab === item.toUpperCase() ? 'bg-white' : 'bg-button'}`}
          onClick={() => onSelectTab(index)}
        >
          <span style={{ color: state.tab === item.toUpperCase() ? '#DD0000' : 'white' }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default DeliverableTab;
