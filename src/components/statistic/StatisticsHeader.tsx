import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { StatisticsContext, StatisticsIndexType } from '../../containers/statistic/StatisticContainer';

function StatisticsHeader(): JSX.Element {
  const [open, toggle] = useState(true);
  const [ref, { width }] = useMeasure();
  const { state, update } = React.useContext(StatisticsContext);
  const props = useSpring({ width: open ? (width * state.status) / 100 : 0 });

  useEffect(() => {
    setTimeout(() => {
      toggle(true);
    }, 500);
  }, [state.Index]);
  const selectIndex = (value: string) => {
    toggle(false);
    if (state.Index === value) {
      //
    } else {
      update({ ...state, Index: value as StatisticsIndexType });
    }
  };

  return (
    <div ref={ref} className='relative w-full py-4 bg-white rounded-md flex flex-row justify-between items-center px-4'>
      <animated.div className='absolute top-0 left-0 w-full h-full bg-gray1 rounded-md' style={props} />
      {state.Index === 'WEEK' && (
        <animated.div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-black'>
          {'WEEKLY STATUS ' + state.status + ' %'}
        </animated.div>
      )}
      {state.Index === 'MONTH' && (
        <animated.div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-black'>
          {'MONTHLY STATUS ' + state.status + ' %'}
        </animated.div>
      )}
      {state.Index === 'MONTH' ? (
        <span className='text-rouge z-10' onClick={() => selectIndex('WEEK')}>
          Week
        </span>
      ) : (
        <div />
      )}
      {state.Index === 'WEEK' ? (
        <span className='text-rouge z-10' onClick={() => selectIndex('MONTH')}>
          Month
        </span>
      ) : (
        <div />
      )}
    </div>
  );
}

export default StatisticsHeader;
