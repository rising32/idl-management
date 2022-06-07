import React from 'react';
import PriorityCalendar from '../../components/priority/PriorityCalendar';
import PastNotAchievedPriority from '../../components/priority/PastNotAchievedPriority';
import PriorityForm from '../../components/priority/PriorityForm';
import WeeklyPriorities from '../../components/priority/WeeklyPriorities';
import { createCtx } from '../../lib/context/createCtx';
import { getWeekNumber } from '../../lib/utils';
import { PriorityState } from '../../modules/weekPriority';

type PriorityTabType = 'DETAILS' | 'AGENDA' | 'PROJECT' | 'SUPPORT' | 'EXPENSES' | null;
export const TABLIST: PriorityTabType[] = ['DETAILS', 'AGENDA', 'PROJECT', 'SUPPORT', 'EXPENSES'];
interface PriorityInterface {
  selectedWeek: number;
  selectedPriority: PriorityState | null;
  tab: PriorityTabType;
}
const defaultPriorityInterface: PriorityInterface = {
  selectedWeek: getWeekNumber(new Date()),
  selectedPriority: null,
  tab: null,
};

const [ctx, PriorityProvider] = createCtx(defaultPriorityInterface);
export const PriorityContext = ctx;

function MainPriorityContainer() {
  return (
    <PriorityProvider>
      <PriorityCalendar />
      <WeeklyPriorities />
      <PriorityForm />
      <PastNotAchievedPriority />
    </PriorityProvider>
  );
}

export default MainPriorityContainer;
