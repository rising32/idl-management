export interface UserInfoState {
  user_id: number;
  email: string;
  phone_number: string;
  display_name: string;
  password: string;
  avatar?: string;
  birthday?: string;
  role_id: number;
  registration_time?: string;
}
