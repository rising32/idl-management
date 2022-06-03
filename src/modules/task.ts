export interface TaskState {
  task_id: number;
  creator_id: number;
  project_id?: number;
  task_name: string;
  description: string | null;
  planned_start_date: Date | null;
  planned_end_date: Date | null;
  actual_start_date: Date | null;
  actual_end_date: Date | null;
  hourly_rate: number;
  is_add_all: boolean;
  is_active: boolean;
  is_deleted: number;
}

export interface PriorityTaskState {
  client_id: number;
  client_name: string;
  task: TaskState[];
}

export interface TaskAssignState {
  assign_id: number | null;
  task_id: number;
  member_id: number;
  role_id: number;
}

export interface CPMDState {
  week: number;
  client_id: number;
  client_name: string;
  member_id: number;
  task: (TaskState & { member_id: number; member_name: string })[];
}
