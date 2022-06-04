import axios from 'axios';
import { ClientState, UserClientState } from '../../modules/client';
import { CompanyInfoState } from '../../modules/company';
import { SettingState } from '../../modules/core';
import { ProjectState } from '../../modules/project';
import { TaskState } from '../../modules/task';
import { UserInfoState } from '../../modules/user';
const host = process.env.REACT_APP_API_HOST;
const apiClient = axios.create({
  baseURL: host,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export default apiClient;

export const sendRegister = (params: { email: string; phone: string; password: string; username: string }) =>
  apiClient.post<UserInfoState>('user/signup', params);

export const sendLogin = (params: { email: string; password: string }) =>
  apiClient.post<{ login_id: number; token: string; user: UserInfoState }>('user/login', params);

export const sendSetting = (params: { user_id: number }) => apiClient.post<SettingState>('/user/get_account_setting', params);
export const sendCompanyInfo = (params: { user_id: number }) => apiClient.post<CompanyInfoState>('/user/get_my_company/profile', params);

export const sendClientList = (company_id: number) =>
  apiClient.post<{
    user_id: number;
    clients: ClientState[];
  }>('/admin/get_company_clients', { company_id });

export const sendCreateClient = (client_name: string, is_active: boolean) =>
  apiClient.post<ClientState>('/admin/create_client', { client_name, is_active });
export const sendRegisterMyClient = (user_id: number, client_id: number, is_active: boolean) =>
  apiClient.post<UserClientState>('/admin/regist_my_client', { user_id, client_id, is_active });

export const sendUpdateClient = (params: ClientState) => apiClient.post<ClientState>('/admin/update_client', params);

export const sendProjectWithClientId = (company_id: number, client_id: number) =>
  apiClient.post<{
    project: ProjectState[];
  }>('/project/get/client_no_assign', { company_id, client_id });

export const sendCreateProject = (params: { creator_id: number; project_name: string; company_id: number; client_id: number }) =>
  apiClient.post<ProjectState>('/project/create', params);
export const sendUpdateProject = (params: ProjectState) => apiClient.post<ProjectState>('/project/update', params);

export const sendTaskWithProjectId = (company_id: number, project_id: number) =>
  apiClient.post<{ task: TaskState[] }>('/project/task/get_by_pna', { company_id, project_id });

export const sendCreateTask = (params: {
  task_id: null;
  creator_id: number;
  project_id?: number;
  task_name: string;
  description: string;
  planned_start_date: string | null;
  planned_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  hourly_rate: number;
  is_add_all: boolean;
  is_active: boolean;
  is_deleted: number;
  company_id: number;
}) => apiClient.post<{ task: TaskState }>('/project/task/create', params);

export const sendUpdateTask = (params: {
  task_id: number | null;
  creator_id: number;
  project_id: number | null;
  task_name: string;
  description: string | null;
  planned_start_date: string | null;
  planned_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  hourly_rate: number;
  is_add_all: boolean;
  is_active: boolean;
  is_deleted: number;
}) => apiClient.post<TaskState>('/project/task/update', params);
