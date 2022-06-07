import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StatisticsContext } from '../../containers/statistic/StatisticContainer';
import { sendMonthStaticsticsData, sendWeekStaticsticsData } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { StatisticTableState } from '../../modules/project';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';

type TableItemType = {
  row: number;
  colomn: number;
  value: string;
  selected: boolean;
};
function StatisticsTable(): JSX.Element {
  const [tableData, setTableDate] = useState<TableItemType[][] | null>(null);
  const [tableHeaderData, setTableHeaderDate] = useState<TableItemType[] | null>(null);
  const { state } = React.useContext(StatisticsContext);

  const { user } = useSelector((state: RootState) => state.core);
  const dispatch = useAppDispatch();
  const [_sendMonthStaticsticsData, , sendMonthStaticsticsDataRes] = useRequest(sendMonthStaticsticsData);
  const [_sendWeekStaticsticsData, , sendWeekStaticsticsDataRes] = useRequest(sendWeekStaticsticsData);

  useEffect(() => {
    if (state.Index === 'MONTH') {
      dispatch(setLayer(true));
      const user_id = user?.user_id;
      user_id && _sendMonthStaticsticsData(user_id);
    } else if (state.Index === 'WEEK') {
      dispatch(setLayer(true));
      const user_id = user?.user_id;
      user_id && _sendWeekStaticsticsData(user_id);
    }
  }, [state.Index]);
  useEffect(() => {
    if (sendMonthStaticsticsDataRes) {
      processData(sendMonthStaticsticsDataRes.data);
    }
  }, [sendMonthStaticsticsDataRes]);
  useEffect(() => {
    if (sendWeekStaticsticsDataRes) {
      processData(sendWeekStaticsticsDataRes.data);
    }
  }, [sendWeekStaticsticsDataRes]);

  const processData = (serverData: StatisticTableState[]) => {
    const headerData: TableItemType[] = [];
    const data: TableItemType[][] = [];
    let type = 'Month';
    let numberRow = 0;
    if (state.Index === 'MONTH') {
      type = 'Month';
      numberRow = 12;
    } else if (state.Index === 'WEEK') {
      type = 'Week';
      numberRow = 52;
    }

    headerData.push({
      row: 0,
      colomn: 0,
      value: type,
      selected: false,
    });

    serverData.map((client, i) => {
      if (client.client_id === -1) {
        headerData.push({
          row: 0,
          colomn: 1,
          value: client.client_name,
          selected: false,
        });
        headerData.push({
          row: 0,
          colomn: 2,
          value: 'Delta',
          selected: false,
        });
        headerData.push({
          row: 0,
          colomn: 3,
          value: 'Total',
          selected: false,
        });
      } else {
        headerData.push({
          row: 0,
          colomn: i + 3,
          value: client.client_name,
          selected: false,
        });
      }
    });

    for (let i = 1; i <= numberRow; i++) {
      const rowItem: TableItemType[] = [];
      rowItem.push({
        row: i,
        colomn: 0,
        value: i.toString(),
        selected: false,
      });

      serverData.map((client, j) => {
        if (client.client_id === -1) {
          rowItem.push({
            row: i,
            colomn: 1,
            value: client.realWorkdays[i - 1].work_days.toString() || '',
            selected: false,
          });
          rowItem.push({
            row: i,
            colomn: 2,
            value: '0',
            selected: false,
          });
          rowItem.push({
            row: i,
            colomn: 3,
            value: '0',
            selected: false,
          });
        } else {
          rowItem.push({
            row: i,
            colomn: j + 3,
            value: client.realWorkdays[i - 1].work_days.toString() || '',
            selected: false,
          });
        }
      });

      let rowTotal = 0;
      rowItem.map(item => {
        if (item.colomn > 3) {
          rowTotal += parseInt(item.value);
        }
      });
      rowItem[3].value = rowTotal.toString();
      rowItem[2].value = (parseInt(rowItem[1].value) - rowTotal).toString();
      data.push(rowItem);
    }

    setTableHeaderDate(headerData);

    const firtRowItem: TableItemType[] = [];
    for (let i = 0; i < data[0].length; i++) {
      if (i === 0) {
        firtRowItem.push({
          row: 0,
          colomn: 0,
          value: 'Σ',
          selected: false,
        });
      } else {
        let itemSum = 0;
        if (i > 0) {
          data.map(item => {
            itemSum += parseInt(item[i].value);
          });
        }
        firtRowItem.push({
          row: 0,
          colomn: i,
          value: itemSum.toString(),
          selected: false,
        });
      }
    }

    data.unshift(firtRowItem);

    setTableDate(data);
    dispatch(setLayer(false));
  };
  const renderTable = () => {
    if (!tableHeaderData) return;
    return (
      <div className='flex'>
        {tableHeaderData.map((item, j) => (
          <div key={j} className='flex flex-1 outline outline-1 outline-white items-center justify-center rotate-180 py-2'>
            <div
              key={j + item.value}
              className='flex capitalize'
              style={{
                writingMode: 'vertical-lr',
                textOrientation: 'mixed',
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='mt-4 text-center'>
      {state.Index === 'WEEK' && <span className=''>My Production</span>}
      {state.Index === 'MONTH' && <span className=''>My forecast</span>}
      {tableData && (
        <div className='border-2 border-white text-sm'>
          {renderTable()}
          <div className='outline outline-1 outline-white'>
            {tableData.map((rowData, i) => (
              <div key={i} className='flex'>
                {rowData.map((item, j) => (
                  <div
                    key={i + j}
                    className={`flex flex-1 outline outline-1 outline-gray items-center justify-center py-1 ${
                      item.colomn === 0 ? 'bg-transparent text-white' : 'bg-white text-black'
                    }`}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsTable;
