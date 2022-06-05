import React, { useState } from 'react';
import WeekNumberCalendar from '../../components/calendar/WeekNumberCalendar';
import { getWeekNumber } from '../../lib/utils';

function MainPriorityContainer() {
  const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));

  const onSelectWeek = (currentWeek: number) => {
    setSelectedWeek(currentWeek);
  };
  return (
    <div>
      <WeekNumberCalendar onSelectWeek={onSelectWeek} />
    </div>
  );
}

export default MainPriorityContainer;
