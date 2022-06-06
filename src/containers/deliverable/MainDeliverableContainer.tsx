import React from 'react';
import DeliverableCalendar from '../../components/deliverable/DeliverableCalendar';
import TodayDeliverable from '../../components/deliverable/TodayDeliverable';
import PastNotAchievedPriority from '../../components/priority/PastNotAchievedPriority';
import PriorityForm from '../../components/priority/PriorityForm';
import { createCtx } from '../../lib/context/createCtx';
import { DeliverableState } from '../../modules/deliverable';
import { PriorityState } from '../../modules/weekPriority';

type DeliverableTabType = 'DETAILS' | 'FILE' | 'PICTURE' | 'SCREENSHOT' | 'EXPENSES' | null;
export const TABLIST: DeliverableTabType[] = ['DETAILS', 'FILE', 'PICTURE', 'SCREENSHOT', 'EXPENSES'];
interface DeliverableInterface {
  selectedDate: Date;
  selectedDeliverable: DeliverableState | null;
  tab: DeliverableTabType;
}
const defaultDeliverableInterface: DeliverableInterface = {
  selectedDate: new Date(),
  selectedDeliverable: null,
  tab: null,
};

const [ctx, DeliverableProvider] = createCtx(defaultDeliverableInterface);
export const DeliverableContext = ctx;

function MainDeliverableContainer() {
  return (
    <DeliverableProvider>
      <DeliverableCalendar />
      <TodayDeliverable />
      <PriorityForm />
      <PastNotAchievedPriority />
    </DeliverableProvider>
  );
}

export default MainDeliverableContainer;
