import { UserInfoState } from './user';

export type AuthMode = 'REGISTER' | 'LOGIN';

export type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
  user: UserInfoState | null;
  popup: {
    title: string | undefined;
    message: string;
    visible: boolean;
  };
};
