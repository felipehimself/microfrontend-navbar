import { TAppRoutes } from '@/types';

export const sortNavItems = (routes: TAppRoutes[]): TAppRoutes[] => {
  const homeObj = routes.find((route) => route.appName === 'Home')!;

  const sortWithoutHome = routes
    .filter((route) => route.appName !== 'Home')
    .sort((a, b) => a.appName.localeCompare(b.appName));

  return [homeObj, ...sortWithoutHome];
};
