export type TNavbarOpenProps = {
  open: boolean;
};

export type TRoutes = {
  submenuName?: string;
  path?: string;
};

export type TAppRoutes = {
  appName: string;
  appIcon?: string;
  routes: TRoutes[];
};
