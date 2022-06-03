import axios from 'axios';
import { UserInfoState } from '../../modules/user';
const host = process.env.REACT_APP_API_HOST;
const apiClient = axios.create({
  baseURL: host,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export default apiClient;

export const sendRegister = (params: { email: string; phone: string; password: string; username: string }) =>
  apiClient.post<UserInfoState>('/v1/auth/register', params);

export const sendLogin = (params: { email: string; password: string }) => apiClient.post<UserInfoState>('/v1/auth/login', params);
