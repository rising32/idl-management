export type ClientState = {
  client_id: number;
  client_name: string;
  is_active: number;
  client_address: string | null;
  client_detail: string | null;
};

export type UserClientState = {
  uc_id: number;
  user_id: number;
  client_id: number;
  is_active: boolean;
};
