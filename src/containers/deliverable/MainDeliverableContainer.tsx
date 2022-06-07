import React from 'react';
import BeforePriorities from '../../components/deliverable/BeforePriorities';
import DeliverableCalendar from '../../components/deliverable/DeliverableCalendar';
import DeliverableForm from '../../components/deliverable/DeliverableForm';
import TodayDeliverable from '../../components/deliverable/TodayDeliverable';
import { createCtx } from '../../lib/context/createCtx';
import { DeliverableState } from '../../modules/deliverable';
import { PriorityState } from '../../modules/weekPriority';

type DeliverableTabType = 'DETAILS' | 'FILE' | 'PICTURE' | 'SCREENSHOT' | 'EXPENSES' | null;
export const DELIVERABLETABLIST: DeliverableTabType[] = ['DETAILS', 'FILE', 'PICTURE', 'SCREENSHOT', 'EXPENSES'];
interface DeliverableInterface {
  selectedDate: Date;
  selectedDeliverable: DeliverableState | null;
  selectedPriority: PriorityState | null;
  tab: DeliverableTabType;
}
const defaultDeliverableInterface: DeliverableInterface = {
  selectedDate: new Date(),
  selectedDeliverable: null,
  selectedPriority: null,
  tab: null,
};

const [ctx, DeliverableProvider] = createCtx(defaultDeliverableInterface);
export const DeliverableContext = ctx;

function MainDeliverableContainer() {
  return (
    <DeliverableProvider>
      <DeliverableCalendar />
      <TodayDeliverable />
      <DeliverableForm />
      <BeforePriorities />
    </DeliverableProvider>
  );
}

export default MainDeliverableContainer;
