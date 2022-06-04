import React, { Ref, useState } from 'react';
import { useSelector } from 'react-redux';
import { ControlProps, GroupBase, OnChangeValue, Props, StylesConfig, components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select/dist/declarations/src/Select';
import { toast } from 'react-toastify';
import { sendTaskWithProjectId } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { ProjectState } from '../../modules/project';
import { TaskState } from '../../modules/task';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import ModalView from '../common/ModalView';
import CreateTask from './CreateTask';

const styles: StylesConfig<TaskState> = {
  container: styles => ({ ...styles, width: '100%' }),
  control: styles => ({ ...styles, backgroundColor: 'transparent', width: '100%', border: 'none', boxShadow: 'none' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#DD0000' : undefined,
      color: data.project_id === null ? 'blue' : isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({ ...styles, color: 'white' }),
  menuList: styles => ({ ...styles, padding: 0, margin: 0, borderRadius: '4px' }),
  placeholder: styles => ({ ...styles, color: 'white' }),
  singleValue: styles => ({ ...styles, color: '#DD0000', textAlign: 'end' }),
};
const Control = ({ children, ...props }: ControlProps<TaskState, false>) => {
  return (
    <components.Control {...props}>
      <span>Tasks:</span>
      {children}
    </components.Control>
  );
};
type ReactSelectProps = Props<TaskState, false, GroupBase<TaskState>>;

export interface SelectProjectProps extends ReactSelectProps {
  name?: string;
  fieldRef: Ref<Select<TaskState, false, GroupBase<TaskState>>> | undefined;
  value: TaskState | null;
  project: ProjectState | null;
  onChange: (task: TaskState | null) => void;
}

const SelectTask = ({ name, value, project, onChange, fieldRef, ...rest }: SelectProjectProps) => {
  const [taskList, setTaskList] = useState<TaskState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { user } = useSelector((state: RootState) => state.core);
  const { company_id } = useSelector((state: RootState) => state.companyInfo);
  const dispatch = useAppDispatch();

  const [_sendTaskWithProjectId, , sendTaskWithProjectIdRes] = useRequest(sendTaskWithProjectId);

  React.useEffect(() => {
    onChange(null);
    if (project) {
      setIsLoading(true);
      const project_id = project.project_id;
      _sendTaskWithProjectId(company_id, project_id);
    } else {
      setTaskList([]);
      setIsLoading(false);
    }
  }, [project]);
  React.useEffect(() => {
    if (sendTaskWithProjectIdRes) {
      setTaskList(sendTaskWithProjectIdRes.task.filter(task => task.project_id !== null));
      setIsLoading(false);
    }
  }, [sendTaskWithProjectIdRes]);

  const handleChange = (newValue: OnChangeValue<TaskState, false>) => {
    onChange(newValue);
  };
  const handleCreate = (value: string) => {
    if (user?.role_id === 1 || user?.role_id === 2) {
      if (project?.project_id) {
        setInputValue(value);
        setIsCreate(true);
        setIsLoading(true);
      } else {
        toast.error('please select project!');
      }
    } else {
      toast.error('Administrator and Manager only can create client!');
    }
  };
  const onSuccess = (task: TaskState) => {
    if (isCreate) {
      const newTaskList = taskList;
      newTaskList.unshift(task);
      setTaskList(newTaskList);

      onChange(task);
      setIsCreate(false);
      setIsLoading(false);
      dispatch(setLayer(false));
    }
  };

  const onCancel = () => {
    setIsCreate(false);
    setIsLoading(false);
  };
  return (
    <div className='px-2'>
      <CreatableSelect<TaskState>
        isClearable
        ref={fieldRef}
        name={name}
        isLoading={isLoading}
        options={taskList}
        components={{ Control }}
        value={value}
        getOptionValue={option => option.task_id.toString()}
        getOptionLabel={option => option.task_name}
        styles={styles}
        onChange={handleChange}
        blurInputOnSelect
        placeholder=''
        getNewOptionData={inputValue => ({
          task_id: 0,
          task_name: `Create new project "${inputValue}"`,
          creator_id: 0,
          description: null,
          planned_start_date: null,
          planned_end_date: null,
          actual_start_date: null,
          actual_end_date: null,
          hourly_rate: 0,
          is_add_all: false,
          is_active: true,
          is_deleted: 0,
          __isNew__: true,
        })}
        onCreateOption={handleCreate}
        {...rest}
      />
      <ModalView isOpen={isCreate} onClose={() => setIsCreate(false)}>
        <CreateTask value={inputValue} onCancel={onCancel} onSuccess={onSuccess} selectedProject={project} />
      </ModalView>
    </div>
  );
};

export default SelectTask;
