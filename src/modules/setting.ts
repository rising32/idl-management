export interface UserSelectOption {
  readonly value: number;
  readonly label: string;
  readonly email: string;
}
export interface EmailSelectOption {
  readonly value: number;
  readonly label: string;
  readonly name: string;
}

export interface TableDataState {
  week?: string;
  month?: string;
  available?: string;
  dalta?: string;
  total?: string;
  atum25?: string;
  amzmhg9?: string;
  amzxdey?: string;
  amzzdej?: string;
  ikea?: string;
  cota?: string;
}
export interface WorkSettingState {
  ws_id?: number;
  user_id: number;
  week: number;
  year: number;
  first_day_of_week: Date;
  work_on_week: number;
  start_work_time: number;
  end_work_time: number;
  remainder: number;
}
// export interface DisplayWorkSettingState {
//   week: number;
//   first_day_of_week: Date;
//   work_on_week: number;
//   start_work_time: number;
//   end_work_time: number;
//   remainder: number;
// }

export const dateFormatOptions = ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-MM-DDD'];
export const currencyFormatOptions = ['Euro (€)', 'Dollar ($)'];
export const timeFormatOptions = ['12-Hour', '24-Hour'];
export const decimalSeparatorOptions = ['Point', 'Comma'];
