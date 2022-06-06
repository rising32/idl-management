import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PriorityContext } from '../../containers/priority/MainPriorityContainer';
import { sendDeliverablesWithPlanedDate } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { getLocalDataString, getWeekNumber } from '../../lib/utils';
import { PriorityState } from '../../modules/weekPriority';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import RoundedView from '../common/RoundedView';
import CompltedIcon from '../common/CompltedIcon';
import { DeliverableContext } from '../../containers/deliverable/MainDeliverableContainer';
import { DeliverableState } from '../../modules/deliverable';
import { format } from 'date-fns';

function TodayDeliverable() {
  const [deliverables, setDeliverables] = useState<DeliverableState[]>([]);

  const [_sendDeliverablesWithPlanedDate, , sendDeliverablesWithPlanedDateRes] = useRequest(sendDeliverablesWithPlanedDate);
  const dispatch = useAppDispatch();
  const { state, update } = React.useContext(DeliverableContext);
  const { user } = useSelector((state: RootState) => state.core);

  useEffect(() => {
    dispatch(setLayer(true));
    const user_id = user?.user_id;
    const planned_end_date = format(state.selectedDate, 'yyyy-MM-dd');
    user_id && _sendDeliverablesWithPlanedDate(user_id, planned_end_date);
  }, [state.selectedDate]);
  useEffect(() => {
    if (sendDeliverablesWithPlanedDateRes) {
      setDeliverables(sendDeliverablesWithPlanedDateRes.deliverable);
      dispatch(setLayer(false));
    }
  }, [sendDeliverablesWithPlanedDateRes]);
  const onSelectDeliverable = (deliverable: DeliverableState | null) => {
    if (deliverable && state.selectedDeliverable?.deliverable_id !== deliverable.deliverable_id) {
      update({ ...state, selectedDeliverable: deliverable });
    } else {
      update({ ...state, selectedDeliverable: null });
    }
  };

  return (
    <div className='text-white mt-4'>
      <div className='flex justify-between px-2'>
        <span className='flex-1 truncate'>{getLocalDataString(state.selectedDate)}</span>
        <span>90%</span>
      </div>
      <RoundedView className='p-4 bg-gray'>
        <ul role='list'>
          {deliverables.length > 0 ? (
            deliverables.map((deliverable, index) => (
              <li key={deliverable.deliverable_id} className='flex items-center justify-between w-full pb-2 first:pt-0 last:pb-0'>
                <div
                  className={`flex flex-1 mr-2 truncate ${
                    state.selectedDeliverable?.deliverable_id === deliverable.deliverable_id ? 'text-rouge-blue' : 'text-white'
                  }`}
                  onClick={() => onSelectDeliverable(deliverable)}
                >
                  {index + 1 + ' : ' + deliverable.deliverable_name}
                </div>
                <p className='flex w-10 items-center justify-center'>{deliverable.is_completed * 50 + ' %'}</p>
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

export default TodayDeliverable;
