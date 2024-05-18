export type TNavbarOpenProps = {
  open: boolean;
};

type TMenuChildren = {
  submenuName: string;
  path: string;
};

type TRoutes = {
  menuName: string;
  menuChildren: TMenuChildren[];
};

export type AppRoutes = {
  appName: string;
  appIcon?: string;
  routes: TRoutes[];
};
