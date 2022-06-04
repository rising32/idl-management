import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import useRequest from '../../lib/hooks/useRequest';
import { sendCreateProject, sendUpdateProject } from '../../lib/api';
import { RootState, useAppDispatch } from '../../store';
import FullInputWithLabel from '../common/FullInputWithLabel';
import { setLayer } from '../../store/features/coreSlice';
import { changeProjectCount } from '../../store/features/companySlice';
import { ProjectState } from '../../modules/project';
import { ClientState } from '../../modules/client';
import { toast } from 'react-toastify';

interface ICreateProjectForm {
  name: string;
  description: string;
}
type Props = {
  value?: string | null;
  selectedProject?: ProjectState;
  onCancel: () => void;
  onSuccess: (project: ProjectState) => void;
  selectedClient: ClientState | null;
};

const CreateProject = ({ value, selectedProject, selectedClient, onCancel, onSuccess }: Props) => {
  const { user } = useSelector((state: RootState) => state.core);
  const { company_id } = useSelector((state: RootState) => state.companyInfo);

  const [_sendCreateProject, , sendCreateProjectRes] = useRequest(sendCreateProject);
  const [_sendUpdateProject, , sendUpdateProjectRes] = useRequest(sendUpdateProject);
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<ICreateProjectForm>({
    defaultValues: {
      name: value || selectedProject?.project_name || '',
      description: selectedProject?.description || '',
    },
  });
  const onCreateProjectSubmit: SubmitHandler<ICreateProjectForm> = data => {
    dispatch(setLayer(true));
    if (selectedProject) {
      _sendUpdateProject({ ...selectedProject, project_name: data.name, description: data.description });
    } else {
      if (selectedClient?.client_id && user?.user_id) {
        const params = {
          project_id: null,
          creator_id: user.user_id,
          client_id: selectedClient.client_id,
          project_name: data.name,
          company_id,
        };
        params.creator_id && _sendCreateProject(params);
      } else {
        toast.error('please select client!');
      }
    }
  };
  React.useEffect(() => {
    if (sendCreateProjectRes) {
      onSuccess(sendCreateProjectRes);
      dispatch(changeProjectCount());
    }
  }, [sendCreateProjectRes]);
  React.useEffect(() => {
    if (sendUpdateProjectRes) {
      onSuccess(sendUpdateProjectRes);
    }
  }, [sendUpdateProjectRes]);

  return (
    <form onSubmit={handleSubmit(onCreateProjectSubmit)} className='w-full'>
      <div className='text-center font-bold'>{selectedProject ? 'Edit this project' : 'Create a new project'}</div>

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
            placeholder='Enter Project Name'
          />
        )}
      />
      <Controller
        control={control}
        name='description'
        // rules={{ required: true }}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <FullInputWithLabel
            label='description'
            onBlur={onBlur}
            name={name}
            fieldRef={ref}
            value={value}
            onChange={onChange}
            placeholder='Enter Description'
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

export default CreateProject;
