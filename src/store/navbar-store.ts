import { TAppRoutes } from '@/types';
import { create } from 'zustand';

type Store = {
  routes: TAppRoutes[];
  selectedApp: string;
  open: boolean;
  setRoutes: (routes: TAppRoutes[]) => void;
  setSelectedApp: (selectedApp: string) => void;
  setOpen: (open: boolean) => void;
};

export const useNavbarStore = create<Store>()((set) => ({
  routes: [],
  selectedApp: '',
  open: true,
  setRoutes: (routes: TAppRoutes[]) => set({ routes }),
  setSelectedApp: (selectedApp: string) => set({ selectedApp }),
  setOpen: (open: boolean) => set({ open }),
}));
