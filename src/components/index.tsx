import {
  Signout,
  WeatherMoon20Filled,
  WeatherSunnyFilled
} from '@/icons';
import { Button, Toaster, mergeClasses } from '@fluentui/react-components';
import {
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
} from '@fluentui/react-nav-preview';
import { useMemo, useState } from 'react';

import { useToaster } from '@/hooks/useToaster';
import { useThemeStore } from '@/store/theme-store';
import { useStyles } from '@/styles';
import { TAppRoutes } from '@/types';
import { navItemsIcons, navItemsMock } from '@/utils/mock-nav-items';
import { sortNavItems } from '@/utils/sort-nav-items';
import { NavItem as NavItemMock } from '@fluentui/react-nav-preview';
import { DrawerHeaderContent } from './elements/drawer-header-content';
import { Skeleton } from './elements/skeleton';
import { NavItem } from './nav/nav-item';

const navbarChannel = new BroadcastChannel('navbarChannel');
const navbarSizeChannel = new BroadcastChannel('navbarSizeChannel');
// const appErrorsChannel = new BroadcastChannel("appErrorsChannel");

// anything as custom props in the mfe-root can be received as props here
export const Navbar = () => {
  const [openNav, setOpenNav] = useState(true);
  const [appRoutes, setAppRoutes] = useState<TAppRoutes[]>([]);
  const [isLoadinsRoutes, setIsLoadinsdRoutes] = useState(true);
  const [currentApp, setCurrentApp] = useState('');

  const { notify } = useToaster('navbar-toaster');

  const { toggleTheme, theme } = useThemeStore();

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    localStorage.setItem('mfe-theme', newTheme);
    dispatchEvent(
      new CustomEvent('mfe-theme', { detail: { theme: newTheme } })
    );
  };

  navbarChannel.onmessage = (e) => {
    const mfeRoutes = e.data as TAppRoutes[];

    const sorted = sortNavItems(mfeRoutes);

    setAppRoutes(sorted);
    setIsLoadinsdRoutes(false);
    navbarChannel.close();
  };

  // Listen for load app erros and paint in the screen
  // appErrorsChannel.onmessage = (e) => {
  //   const appErros = e.data as string[];

  //   appErros.forEach((error) => {
  //     notify(`Error loading ${error}`);
  //   });

  //   appErrorsChannel.close();
  // }

  const styles = useStyles();

  const disableHoverEffect = useMemo(() => {
    return openNav ? undefined : styles.noHover;
  }, [openNav, styles.noHover]);

  const handleNavClick = (appName: string) => {
    setOpenNav(true);
    setCurrentApp(appName);
  };

  const handleSingleRouteClick = () => {
    !openNav && setOpenNav(true);
  }

  const handleMockClick = () => {
    setOpenNav(true);
    notify();
  };

  const drawerClassName = useMemo(() => {
    return openNav ? styles.root : styles.rootSm;
  }, [openNav, styles.root, styles.rootSm]);

  const navItemClassName = mergeClasses(disableHoverEffect, styles.noWrap);

  const handleOpenDrawer = () => {
    setOpenNav(prev => !prev)
    navbarSizeChannel.postMessage({ openNav: !openNav })
  }

  return (
    <>
      <Button
        onClick={handleTheme}
        appearance="transparent"
        className={styles.changeThemeButton}
        icon={
          theme === 'light' ? <WeatherMoon20Filled /> : <WeatherSunnyFilled />
        }
      />
      <NavDrawer className={drawerClassName} open type="inline" size="small">
        <NavDrawerHeader>
          <NavDrawerHeaderNav>
            <DrawerHeaderContent setOpenNav={handleOpenDrawer} openNav={openNav} />
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <NavDrawerBody className={styles.noOverflowX}>
          {isLoadinsRoutes ? (
            <Skeleton />
          ) : (
            <>
              {appRoutes.map((item, index) => {
                const Icon = navItemsIcons.find(
                  (navIcon) => navIcon.appIcon === item.appIcon
                )?.icon;

                return (
                  <NavItem
                    appName={item.appName}
                    onClick={() => handleNavClick(item.appName)}
                    icon={Icon}
                    routes={item.routes}
                    open={openNav}
                    path={item.path}
                    value={index}
                    currentApp={currentApp}
                    className={navItemClassName}
                    handleSingleRouteClick={() => handleSingleRouteClick()}
                  />
                );
              })}

              {navItemsMock.map(({ icon, menuName }, index) => {
                return (
                  <NavItemMock
                    icon={icon}
                    onClick={handleMockClick}
                    value={menuName}
                    className={mergeClasses(disableHoverEffect, styles.cursorPointer)}
                  >
                    {openNav && menuName}
                  </NavItemMock>
                );
              })}
            </>
          )}
        </NavDrawerBody>
        <NavDrawerFooter className={styles.noOverflowX}>
          <div className={mergeClasses(styles.center, styles.btnFooterPadding)}>
            {openNav ? (
              <Button>Sign out</Button>
            ) : (
              <Button icon={<Signout fontSize="1rem" />} />
            )}
          </div>
        </NavDrawerFooter>
      </NavDrawer>
      <Toaster toasterId="navbar-toaster" />
    </>
  );
};
