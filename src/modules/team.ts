export interface CompanyMemberState {
  cm_id: number | null;
  company_id: number;
  member_id: number;
  role_id: number;
  user_id: number;
  email: string;
  phone_number: string;
  display_name: string;
  password: string;
  avatar?: string;
  birthday?: string;
  registration_time?: string;
}
