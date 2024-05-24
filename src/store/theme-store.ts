import { create } from 'zustand';

type TTheme = 'light' | 'dark';

type TThemeStore = {
  theme: TTheme;
  toggleTheme: () => void;
};

export const useThemeStore = create<TThemeStore>()((set) => ({
  theme: (localStorage.getItem('mfe-theme') as TTheme) ?? 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return {
        theme: newTheme,
      };
    }),
}));
