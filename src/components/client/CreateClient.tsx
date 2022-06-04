import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useRequest from '../../lib/hooks/useRequest';
import { sendCreateClient, sendRegisterMyClient, sendUpdateClient } from '../../lib/api';
import { ClientState } from '../../modules/client';
import { RootState, useAppDispatch } from '../../store';
import FullInputWithLabel from '../common/FullInputWithLabel';
import ModalView from '../common/ModalView';
import { setLayer } from '../../store/features/coreSlice';
import { changeClientCount } from '../../store/features/companySlice';

interface ICreateClientForm {
  name: string;
}
type Props = {
  value?: string | null;
  selectedClient?: ClientState;
  onCancel: () => void;
  onSuccess: (client: ClientState) => void;
};

const CreateClient = ({ value, selectedClient, onCancel, onSuccess }: Props) => {
  const [selectableClient, setSelectableClient] = useState<ClientState | null>(null);
  const { user } = useSelector((state: RootState) => state.core);

  const [_sendCreateClient, , createClientRes] = useRequest(sendCreateClient);
  const [_sendRegisterMyClient, , sendRegisterMyClientRes] = useRequest(sendRegisterMyClient);
  const [_sendUpdateClient, , sendUpdateClientRes] = useRequest(sendUpdateClient);
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<ICreateClientForm>({
    defaultValues: {
      name: value || selectedClient?.client_name,
    },
  });
  const onCreateClientSubmit: SubmitHandler<ICreateClientForm> = data => {
    dispatch(setLayer(true));
    if (selectedClient) {
      _sendUpdateClient({ ...selectedClient, client_name: data.name });
    } else {
      const client_name = data.name;
      const is_active = true;
      _sendCreateClient(client_name, is_active);
    }
  };
  React.useEffect(() => {
    if (createClientRes) {
      const user_id = user?.user_id;
      const client_id = createClientRes.client_id;
      const is_active = createClientRes.is_active;
      user_id && _sendRegisterMyClient(user_id, client_id, is_active);
      setSelectableClient(createClientRes);
    }
  }, [createClientRes]);
  React.useEffect(() => {
    if (sendRegisterMyClientRes && selectableClient) {
      onSuccess(selectableClient);
      dispatch(changeClientCount());
    }
  }, [sendRegisterMyClientRes]);
  React.useEffect(() => {
    if (sendUpdateClientRes && selectedClient) {
      onSuccess(sendUpdateClientRes);
    }
  }, [sendUpdateClientRes]);

  return (
    <form onSubmit={handleSubmit(onCreateClientSubmit)} className='w-full'>
      <div className='text-center font-bold'>{selectedClient ? 'Edit this client' : 'Create a new client'}</div>

      <Controller
        control={control}
        name='name'
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <FullInputWithLabel
            label='name'
            onBlur={onBlur}
            name={name}
            fieldRef={ref}
            value={value}
            onChange={onChange}
            placeholder='Enter Password'
          />
        )}
      />
      <div className='flex justify-between w-full px-8 pt-4 text-lg font-bold'>
        <div onClick={onCancel}>No</div>
        <button type='submit' className='text-rouge font-bold'>
          Yes
        </button>
      </div>
    </form>
  );
};

export default CreateClient;
