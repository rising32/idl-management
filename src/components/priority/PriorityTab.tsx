import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PriorityContext, TABLIST } from '../../containers/priority/MainPriorityContainer';

function PriorityTab() {
  const navigate = useNavigate();
  const { state, update } = React.useContext(PriorityContext);

  const onSelectTab = (index: number) => {
    if (state.selectedPriority) {
      update({ ...state, tab: TABLIST[index] });
    }
  };
  return (
    <div className='absolute -bottom-1 left-0 w-full flex flex-row justify-evenly items-center text-xs'>
      {['Details', 'Agenda', 'Project', 'Support', 'Expenses'].map((item, index) => (
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

export default PriorityTab;
