import axios from 'axios';
import { CompanyInfoState } from '../../modules/company';
import { SettingState } from '../../modules/core';
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
