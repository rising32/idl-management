export interface PriorityState {
  wp_id?: number | null;
  user_id: number;
  week: number;
  priority: string;
  project_id?: number;
  goal: string;
  detail: string | null;
  is_completed: number;
  is_weekly: number;
  end_date: Date | null;
}
