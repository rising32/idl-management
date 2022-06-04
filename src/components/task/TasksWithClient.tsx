import React, { useEffect, useState } from 'react';
import { CPMDState } from '../../modules/task';
import useRequest from '../../lib/hooks/useRequest';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { Control, useWatch } from 'react-hook-form';
import { getShortName, getWeekNumber } from '../../lib/utils';
import { TaskFormType } from './TaskForm';
import { setLayer } from '../../store/features/coreSlice';
import RoundedView from '../common/RoundedView';
import { sendTasksWithCPMD } from '../../lib/api';
import { MinusSvg, PlusSvg } from '../../assets/svg';

interface Props {
  selectedWeek?: number;
  control: Control<TaskFormType>;
}
function TasksWithClient({ selectedWeek, control }: Props) {
  const [taskList, setTaskList] = useState<CPMDState[]>([]);
  const { admin_info } = useSelector((state: RootState) => state.companyInfo);
  const dispatch = useAppDispatch();
  const [_sendTasksWithCPMD, , sendTasksWithCPMDRes] = useRequest(sendTasksWithCPMD);

  const client = useWatch({
    control,
    name: 'client',
  });
  const project = useWatch({
    control,
    name: 'project',
  });
  const member = useWatch({
    control,
    name: 'member',
  });
  const when = useWatch({
    control,
    name: 'when',
  });

  useEffect(() => {
    if (admin_info?.user_id) {
      dispatch(setLayer(true));
      const params = {
        user_id: admin_info?.user_id,
        member_id: member?.user_id || null,
        client_id: client?.client_id || null,
        project_id: project?.project_id || null,
        planned_end_date: when || null,
      };
      _sendTasksWithCPMD(params);
    }
  }, [admin_info, client, project, member, when]);
  useEffect(() => {
    if (sendTasksWithCPMDRes) {
      setTaskList(sendTasksWithCPMDRes);
      dispatch(setLayer(false));
    }
  }, [sendTasksWithCPMDRes]);
  return (
    <>
      <div className='mt-4 text-center'>{'Tasks Week ' + getWeekNumber(when || new Date())}</div>
      <RoundedView className='p-4 bg-gray text-white pb-12 relative'>
        {taskList.map(item => (
          <div key={item.client_id} className='flex flex-col mb-3'>
            <span className='font-bold mb-2 text-center'>{item.client_name}</span>
            {item.task.map(task => (
              <div key={task.task_id} className='flex items-center'>
                {/* <SelectedAndCompltedIcon isSelected={false} isCompleted={false} /> */}
                <span className='pl-2 truncate'>{getShortName(task.member_name) + '-' + 'W' + selectedWeek + ' : ' + task.task_name}</span>
              </div>
            ))}
          </div>
        ))}
        {taskList.length > 0 && (
          <div className='bg-white w-8 h-8 rounded-full shadow-xl items-center justify-center flex absolute bottom-4 right-4'>
            <MinusSvg className='w-6 h-6 text-rouge' />
          </div>
        )}
      </RoundedView>
    </>
  );
}

export default TasksWithClient;
