import {
  tasksActiveThumbnail,
  tasksInactiveThumbnail,
  prioritiesActiveThumbnail,
  prioritiesInactiveThumbnail,
  deliverableActiveThumbnail,
  deliverableInactiveThumbnail,
  accountActiveThumbnail,
  accountInactiveThumbnail,
  statisticsActiveThumbnail,
  statisticsInactiveThumbnail,
} from '../assets/images';

const navLinkList = [
  {
    to: '/tasks',
    pathName: 'Tasks',
    active_image: tasksActiveThumbnail,
    inactive_image: tasksInactiveThumbnail,
  },
  {
    to: '/priorities',
    pathName: 'Priorities',
    active_image: prioritiesActiveThumbnail,
    inactive_image: prioritiesInactiveThumbnail,
  },
  {
    to: '/deliverables',
    pathName: 'Deliverables',
    active_image: deliverableActiveThumbnail,
    inactive_image: deliverableInactiveThumbnail,
  },
  {
    to: '/statistics',
    pathName: 'Statistics',
    active_image: statisticsActiveThumbnail,
    inactive_image: statisticsInactiveThumbnail,
  },
  {
    to: '/account',
    pathName: 'Account',
    active_image: accountActiveThumbnail,
    inactive_image: accountInactiveThumbnail,
  },
];

export function getNavLinkList() {
  return navLinkList;
}
