import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PriorityContext } from '../../containers/priority/MainPriorityContainer';
import { sendPastNotAchievedPriorities } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { getWeekNumber } from '../../lib/utils';
import { PriorityState } from '../../modules/weekPriority';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import RoundedView from '../common/RoundedView';
import CompltedIcon from '../common/CompltedIcon';

function PastNotAchievedPriority() {
  const [pastNotAchievedPriorities, setPastNotAchievedPriorities] = useState<PriorityState[]>([]);

  const [_sendPastNotAchievedPriorities, , sendPastNotAchievedPrioritiesRes] = useRequest(sendPastNotAchievedPriorities);

  const dispatch = useAppDispatch();
  const { state } = React.useContext(PriorityContext);
  const { user } = useSelector((state: RootState) => state.core);

  useEffect(() => {
    dispatch(setLayer(true));
    const user_id = user?.user_id;
    const week = state.selectedWeek;
    user_id && _sendPastNotAchievedPriorities(user_id, week);
  }, [state.selectedWeek]);
  useEffect(() => {
    if (sendPastNotAchievedPrioritiesRes) {
      setPastNotAchievedPriorities(sendPastNotAchievedPrioritiesRes.priority);
      dispatch(setLayer(false));
    }
  }, [sendPastNotAchievedPrioritiesRes]);

  return (
    <div className='text-white mt-4'>
      <div className='text-center'>Past priorities not achieved</div>
      <RoundedView className='p-4 bg-gray'>
        <ul role='list'>
          {pastNotAchievedPriorities.length > 0 ? (
            pastNotAchievedPriorities.map((priority, index) => (
              <li key={priority.wp_id} className='flex items-center py-1 truncate'>
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

export default PastNotAchievedPriority;
