import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PriorityContext } from '../../containers/priority/MainPriorityContainer';
import { sendPriorityByWeek } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { getWeekNumber } from '../../lib/utils';
import { PriorityState } from '../../modules/weekPriority';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import RoundedView from '../common/RoundedView';
import CompltedIcon from '../common/CompltedIcon';

function PriorityForm() {
  const [weeklyPriorities, setWeeklyPriorities] = useState<PriorityState[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<PriorityState | null>(null);

  const [_sendPriorityByWeek, , sendPriorityByWeekRes] = useRequest(sendPriorityByWeek);
  const dispatch = useAppDispatch();
  const { state } = React.useContext(PriorityContext);
  const { user } = useSelector((state: RootState) => state.core);

  useEffect(() => {
    dispatch(setLayer(true));
    const user_id = user?.user_id;
    const week = state.selectedWeek;
    user_id && _sendPriorityByWeek(user_id, week);
  }, [state.selectedWeek]);
  useEffect(() => {
    if (sendPriorityByWeekRes) {
      setWeeklyPriorities(sendPriorityByWeekRes.priority);
      dispatch(setLayer(false));
    }
  }, [sendPriorityByWeekRes]);
  const onSelectPriority = (priority: PriorityState | null) => {
    if (priority && selectedPriority?.wp_id !== priority.wp_id) {
      setSelectedPriority(priority);
    } else {
      setSelectedPriority(null);
    }
  };

  return (
    <div className='text-white mt-4'>
      <div className='text-center'>Priority achieved this week with clear goal defined</div>
      <RoundedView className='border-4 border-rouge bg-gray p-4'>
        <ul role='list'>
          {weeklyPriorities.length > 0 ? (
            weeklyPriorities.map((priority, index) => (
              <li
                key={priority.wp_id}
                className={`flex items-center pb-2 first:pt-0 last:pb-0 ${
                  selectedPriority?.wp_id === priority.wp_id ? 'text-rouge' : 'text-white'
                }`}
                onClick={() => onSelectPriority(priority)}
              >
                {state.selectedWeek !== getWeekNumber(new Date()) && (
                  <CompltedIcon isSelected={selectedPriority?.wp_id === priority.wp_id} isCompleted={priority.is_completed === 1} />
                )}
                <div className='flex flex-1 overflow-hidden'>{index + 1 + ' : ' + priority.priority}</div>
              </li>
            ))
          ) : (
            <div>empty!</div>
          )}
        </ul>
      </RoundedView>
    </div>
  );
}

export default PriorityForm;
