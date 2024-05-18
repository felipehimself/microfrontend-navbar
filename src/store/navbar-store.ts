import { AppRoutes } from '@/types';
import { create } from 'zustand';

type Store = {
  routes: AppRoutes[];
  selectedApp: string;
  open: boolean;
  setRoutes: (routes: AppRoutes[]) => void;
  setSelectedApp: (selectedApp: string) => void;
  setOpen: (open: boolean) => void;
};

export const useNavbarStore = create<Store>()((set) => ({
  routes: [],
  selectedApp: '',
  open: true,
  setRoutes: (routes: AppRoutes[]) => set({ routes }),
  setSelectedApp: (selectedApp: string) => set({ selectedApp }),
  setOpen: (open: boolean) => set({ open }),
}));
