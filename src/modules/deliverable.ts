// import { CarSvg, FlightSvg, TrainSvg, BusSvg, MealSvg, HotelSvg, InvitationSvg, OtherSvg } from '../assets/svg';

export interface DeliverableState {
  deliverable_id?: number | null;
  user_id: number;
  deliverable_name: string;
  task_id: number;
  periority_id: number | null;
  budget: number;
  planned_end_date: string;
  end_date: Date | null;
  is_completed: number;
}

export interface DeliverableInfoState {
  deliverable_id?: number;
  user_id: number;
  deliverable_name: string;
  task_id: number;
  task_name: string;
  periority_id: number;
  budget: number;
  planned_end_date: string;
  end_date: Date | null;
  is_completed: number;
  client_id: number;
  client_name: string;
  project_id: number;
  project_name: string;
}
export interface ExpenseKindState {
  value: string;
  label: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

// export const deliverablesExpenseKind: ExpenseKindState[] = [
//   {
//     value: 'car',
//     label: 'Car',
//     icon: CarSvg,
//   },
//   {
//     value: 'flight',
//     label: 'Flight',
//     icon: FlightSvg,
//   },
//   {
//     value: 'train',
//     label: 'Train',
//     icon: TrainSvg,
//   },
//   {
//     value: 'bus',
//     label: 'Bus',
//     icon: BusSvg,
//   },
//   {
//     value: 'meal',
//     label: 'Meal',
//     icon: MealSvg,
//   },
//   {
//     value: 'hotel',
//     label: 'Hotel',
//     icon: HotelSvg,
//   },
//   {
//     value: 'invitation',
//     label: 'Invitation',
//     icon: InvitationSvg,
//   },
//   {
//     value: 'other',
//     label: 'Other',
//     icon: OtherSvg,
//   },
// ];
