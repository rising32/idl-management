import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeliverableContext } from '../../containers/deliverable/MainDeliverableContainer';
import { sendPastNotAchievedPriorities } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { getWeekNumber } from '../../lib/utils';
import { PriorityState } from '../../modules/weekPriority';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import CompltedIcon from '../common/CompltedIcon';
import RoundedView from '../common/RoundedView';

function BeforePriorities() {
  const [priorities, setPriorities] = useState<PriorityState[]>([]);

  const [_sendPastNotAchievedPriorities, , sendPastNotAchievedPrioritiesRes] = useRequest(sendPastNotAchievedPriorities);

  const dispatch = useAppDispatch();
  const { state } = React.useContext(DeliverableContext);
  const { user } = useSelector((state: RootState) => state.core);

  useEffect(() => {
    dispatch(setLayer(true));
    const user_id = user?.user_id;
    const week = getWeekNumber(state.selectedDate);
    user_id && _sendPastNotAchievedPriorities(user_id, week);
  }, [state.selectedDate]);
  useEffect(() => {
    if (sendPastNotAchievedPrioritiesRes) {
      setPriorities(sendPastNotAchievedPrioritiesRes.priority);
      dispatch(setLayer(false));
    }
  }, [sendPastNotAchievedPrioritiesRes]);

  return (
    <div className='text-white mt-4'>
      <div className='text-center'>Past priorities not achieved</div>
      <RoundedView className='p-4 bg-gray'>
        <ul role='list'>
          {priorities.length > 0 ? (
            priorities.map(priority => (
              <li key={priority.wp_id} className='flex items-center py-1 truncate'>
                <CompltedIcon isSelected={state.selectedPriority?.wp_id === priority.wp_id} isCompleted={priority.is_completed === 1} />
                <div className='flex flex-1 overflow-hidden'>{'W' + priority.week + ' : ' + priority.priority}</div>
              </li>
            ))
          ) : (
            <div>Weekly priority is empty</div>
          )}
        </ul>
      </RoundedView>
    </div>
  );
}

export default BeforePriorities;
