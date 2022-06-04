import React, { Ref, useState } from 'react';
import { useSelector } from 'react-redux';
import { ControlProps, GroupBase, OnChangeValue, Props, StylesConfig, components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select/dist/declarations/src/Select';
import { toast } from 'react-toastify';
import { sendClientList } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { ClientState } from '../../modules/client';
import { RootState, useAppDispatch } from '../../store';
import { setLayer } from '../../store/features/coreSlice';
import ModalView from '../common/ModalView';
import CreateClient from './CreateClient';

const clientStyles: StylesConfig<ClientState> = {
  container: styles => ({ ...styles, width: '100%' }),
  control: styles => ({ ...styles, backgroundColor: 'transparent', width: '100%', border: 'none', boxShadow: 'none' }),
  option: (styles, { isDisabled, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#DD0000' : undefined,
      color: isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({ ...styles, color: 'white' }),
  menuList: styles => ({ ...styles, padding: 0, margin: 0, borderRadius: '4px' }),
  placeholder: styles => ({ ...styles, color: 'white' }),
  singleValue: styles => ({ ...styles, color: '#DD0000', textAlign: 'end' }),
};
const Control = ({ children, ...props }: ControlProps<ClientState, false>) => {
  return (
    <components.Control {...props}>
      <span>Clients:</span>
      {children}
    </components.Control>
  );
};
type ReactSelectProps = Props<ClientState, false, GroupBase<ClientState>>;

export interface SelectClientProps extends ReactSelectProps {
  name?: string;
  fieldRef: Ref<Select<ClientState, false, GroupBase<ClientState>>> | undefined;
  value: ClientState | null;
  onChange: (client: ClientState | null) => void;
}

const SelectClient = ({ name, value, onChange, fieldRef, ...rest }: SelectClientProps) => {
  const [clientList, setClientList] = useState<ClientState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { user } = useSelector((state: RootState) => state.core);
  const { company_id } = useSelector((state: RootState) => state.companyInfo);
  const dispatch = useAppDispatch();

  const [_sendClientList, , sendClientListRes] = useRequest(sendClientList);

  React.useEffect(() => {
    if (company_id) {
      setIsLoading(true);
      _sendClientList(company_id);
    }
  }, [company_id]);
  React.useEffect(() => {
    if (sendClientListRes) {
      setClientList(sendClientListRes.clients);
      setIsLoading(false);
    }
  }, [sendClientListRes]);

  const handleChange = (newValue: OnChangeValue<ClientState, false>) => {
    onChange(newValue);
  };
  const handleCreate = (value: string) => {
    if (user?.role_id === 1) {
      setInputValue(value);
      setIsCreate(true);
      setIsLoading(true);
    } else {
      toast.error('Administrator only can create client!');
    }
  };
  const onSuccess = (client: ClientState) => {
    if (isCreate) {
      const newClientList = clientList;
      newClientList.unshift(client);
      setClientList(newClientList);

      onChange(client);
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
    <div className='p-2'>
      <CreatableSelect<ClientState>
        isClearable
        ref={fieldRef}
        name={name}
        isLoading={isLoading}
        options={clientList}
        components={{ Control }}
        value={value}
        getOptionValue={option => option.client_id.toString()}
        getOptionLabel={option => option.client_name}
        styles={clientStyles}
        onChange={handleChange}
        blurInputOnSelect
        getNewOptionData={inputValue => ({
          client_id: 0,
          client_name: `Create new client "${inputValue}"`,
          is_active: 1,
          client_address: null,
          client_detail: null,
          __isNew__: true,
        })}
        onCreateOption={handleCreate}
        {...rest}
      />
      <ModalView isOpen={isCreate} onClose={() => setIsCreate(false)}>
        <CreateClient value={inputValue} onCancel={onCancel} onSuccess={onSuccess} />
      </ModalView>
    </div>
  );
};

export default SelectClient;
