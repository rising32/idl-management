export interface ProjectState {
  project_id: number;
  creator_id: number;
  client_id?: number;
  project_name: string;
  planned_start_date: string | null;
  planned_end_date: string | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  description: string | null;
}

export interface WeekWorkDay {
  week: number;
  work_days: number;
}
export interface MonthWorkDay {
  week: number;
  work_days: number;
}

export interface StatisticTableState {
  client_id: number;
  client_name: string;
  realWorkdays: WeekWorkDay[] | MonthWorkDay[];
}

export interface ClientProjectState {
  cp_id: number | null;
  project_id: number;
  client_id: number;
}

export interface ProjectTypeState {
  project_type: number;
  project_label: string;
}
