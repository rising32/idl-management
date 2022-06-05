import React from 'react';
import WeekNumberCalendar from '../../components/calendar/WeekNumberCalendar';
import WeeklyPriorities from '../../components/priority/WeeklyPriorities';
import { createCtx } from '../../lib/context/createCtx';
import { getWeekNumber } from '../../lib/utils';
import { PriorityState } from '../../modules/weekPriority';

interface PriorityInterface {
  selectedWeek: number;
  newPriority: PriorityState | null;
}
const defaultPriorityInterface: PriorityInterface = {
  selectedWeek: getWeekNumber(new Date()),
  newPriority: null,
};

const [ctx, PriorityProvider] = createCtx(defaultPriorityInterface);
export const PriorityContext = ctx;

function MainPriorityContainer() {
  return (
    <PriorityProvider>
      <WeekNumberCalendar />
      <WeeklyPriorities />
    </PriorityProvider>
  );
}

export default MainPriorityContainer;
