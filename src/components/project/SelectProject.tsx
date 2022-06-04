import React, { Ref, useState } from 'react';
import { useSelector } from 'react-redux';
import { ControlProps, GroupBase, OnChangeValue, Props, StylesConfig, components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select/dist/declarations/src/Select';
import { toast } from 'react-toastify';
import { sendProjectWithClientId } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { ClientState } from '../../modules/client';
import { ProjectState } from '../../modules/project';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import ModalView from '../common/ModalView';
import CreateProject from './CreateProject';

const clientStyles: StylesConfig<ProjectState> = {
  container: styles => ({ ...styles, width: '100%' }),
  control: styles => ({ ...styles, backgroundColor: 'transparent', width: '100%', border: 'none', boxShadow: 'none' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#DD0000' : undefined,
      color: data.client_id === null ? 'blue' : isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({ ...styles, color: 'white' }),
  menuList: styles => ({ ...styles, padding: 0, margin: 0, borderRadius: '4px' }),
  placeholder: styles => ({ ...styles, color: 'white' }),
  singleValue: (styles, { data }) => ({ ...styles, color: '#DD0000', textAlign: 'end' }),
};
const Control = ({ children, ...props }: ControlProps<ProjectState, false>) => {
  return (
    <components.Control {...props}>
      <span>Projects:</span>
      {children}
    </components.Control>
  );
};
type ReactSelectProps = Props<ProjectState, false, GroupBase<ProjectState>>;

export interface SelectProjectProps extends ReactSelectProps {
  name?: string;
  fieldRef: Ref<Select<ProjectState, false, GroupBase<ProjectState>>> | undefined;
  value: ProjectState | null;
  client: ClientState | null;
  onChange: (project: ProjectState | null) => void;
}

const SelectProject = ({ name, value, client, onChange, fieldRef, ...rest }: SelectProjectProps) => {
  const [projectList, setProjectList] = useState<ProjectState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { user } = useSelector((state: RootState) => state.core);
  const { company_id } = useSelector((state: RootState) => state.companyInfo);
  const dispatch = useAppDispatch();

  const [_sendProjectWithClientId, , sendProjectWithClientIdRes] = useRequest(sendProjectWithClientId);

  React.useEffect(() => {
    onChange(null);
    if (client) {
      setIsLoading(true);
      const client_id = client.client_id;
      client_id && _sendProjectWithClientId(company_id, client_id);
    } else {
      setProjectList([]);
      setIsLoading(false);
    }
  }, [client]);
  React.useEffect(() => {
    if (sendProjectWithClientIdRes) {
      setProjectList(sendProjectWithClientIdRes.project.filter(project => project.client_id !== null));
      setIsLoading(false);
    }
  }, [sendProjectWithClientIdRes]);

  const handleChange = (newValue: OnChangeValue<ProjectState, false>) => {
    console.log(newValue);
    onChange(newValue);
  };
  const handleCreate = (value: string) => {
    if (user?.role_id === 1 || user?.role_id === 2) {
      if (client?.client_id) {
        setInputValue(value);
        setIsCreate(true);
        setIsLoading(true);
      } else {
        toast.error('please select client!');
      }
    } else {
      toast.error('Administrator and Manager only can create client!');
    }
  };
  const onSuccess = (project: ProjectState) => {
    if (isCreate) {
      const newProjectList = projectList;
      newProjectList.unshift(project);
      setProjectList(newProjectList);

      onChange(project);
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
      <CreatableSelect<ProjectState>
        isClearable
        ref={fieldRef}
        name={name}
        isLoading={isLoading}
        options={projectList}
        components={{ Control }}
        value={value}
        getOptionValue={option => option.project_id.toString()}
        getOptionLabel={option => option.project_name}
        styles={clientStyles}
        onChange={handleChange}
        blurInputOnSelect
        placeholder=''
        getNewOptionData={inputValue => ({
          project_id: 0,
          creator_id: 0,
          project_name: `Create new project "${inputValue}"`,
          planned_start_date: null,
          planned_end_date: null,
          actual_start_date: null,
          actual_end_date: null,
          description: null,
          __isNew__: true,
        })}
        onCreateOption={handleCreate}
        {...rest}
      />
      <ModalView isOpen={isCreate} onClose={() => setIsCreate(false)}>
        <CreateProject value={inputValue} onCancel={onCancel} onSuccess={onSuccess} selectedClient={client} />
      </ModalView>
    </div>
  );
};

export default SelectProject;
