import {
  Announcements,
  Dashboard,
  EmployeeSpotlight,
  HealthPlans,
  Home,
  Interviews,
  JobPostings,
  PerformanceReviews,
  Search
} from '@/icons';

export const navItemsMock = [
  {
    menuName: 'Employee',
    icon: <EmployeeSpotlight />,
  },
  {
    menuName: 'Profile',
    icon: <Search />,
  },
  {
    menuName: 'Performance',
    icon: <PerformanceReviews />,
  },
  {
    menuName: 'Health',
    icon: <HealthPlans />,
  },
  {
    menuName: 'Interviews',
    icon: <Interviews />,
  },
];

export const navItemsIcons = [
  { appIcon: 'Home', icon: <Home /> },
  { appIcon: 'Announcements', icon: <Announcements /> },
  { appIcon: 'JobPostings', icon: <JobPostings /> },
  { appIcon: 'Dashboard', icon: <Dashboard /> },
];
