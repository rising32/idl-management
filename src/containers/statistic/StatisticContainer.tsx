import React from 'react';
import StatisticsHeader from '../../components/statistic/StatisticsHeader';
import StatisticsTable from '../../components/statistic/StatisticsTable';
import { createCtx } from '../../lib/context/createCtx';

export type StatisticsIndexType = 'MONTH' | 'WEEK';

interface StatisticsInterface {
  status: number;
  Index: StatisticsIndexType;
}
const defaultStatisticsInterface: StatisticsInterface = {
  status: 50,
  Index: 'MONTH',
};

const [ctx, StatisticsProvider] = createCtx(defaultStatisticsInterface);
export const StatisticsContext = ctx;

function StatisticContainer() {
  return (
    <StatisticsProvider>
      <StatisticsHeader />
      <StatisticsTable />
    </StatisticsProvider>
  );
}

export default StatisticContainer;
