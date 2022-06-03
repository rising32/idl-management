import { UserInfoState } from './user';

export type AuthMode = 'REGISTER' | 'LOGIN';
export interface SettingState {
  as_id: number | null;
  date_format: number;
  time_format: number;
  currency: number;
  decimal_seperator: number;
}

export type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
  user: UserInfoState | null;
  token: string | null;
  setting: SettingState;
  popup: {
    title: string | undefined;
    message: string;
    visible: boolean;
  };
};
