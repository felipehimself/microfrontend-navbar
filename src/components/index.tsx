import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
} from '@fluentui/react-nav-preview';
import { Button, Toaster, mergeClasses } from '@fluentui/react-components';
import {
  NavigationFilled,
  Signout,
  Home20Filled,
  WeatherSunnyFilled,
  WeatherMoon20Filled,
} from '@/icons';

import { NavItem } from './nav/nav-item';
import { useStyles } from '@/styles';
import { TAppRoutes } from '@/types';
import { Skeleton } from './elements/skeleton';
import { NavItem as NavItemMock } from '@fluentui/react-nav-preview';
import { Avatar } from './elements/avatar';
import { useToaster } from '@/hooks/useToaster';
import { useThemeStore } from '@/store/theme-store';
import { navItemsMock, navItemsIcons } from '@/utils/mock-nav-items';

const navbarChannel = new BroadcastChannel('navbarChannel');

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
    const sorted = mfeRoutes.sort((a, b) => a.appName.localeCompare(b.appName));
    setAppRoutes(sorted);
    setIsLoadinsdRoutes(false);
    navbarChannel.close();
  };

  const styles = useStyles();

  const disableHoverEffect = useMemo(() => {
    return openNav ? undefined : styles.noHover;
  }, [openNav]);

  const handleNavClick = (appName: string) => {
    setCurrentApp(appName);
    setOpenNav(true);
  };

  const handleMockClick = () => {
    setOpenNav(true);
    notify();
  };

  const drawerClassName = useMemo(() => {
    return openNav ? styles.root : styles.rootSm;
  }, [openNav]);

  const navItemClassName = mergeClasses(disableHoverEffect, styles.noWrap);

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
            <div className={styles.headerContainer}>
              <div className={styles.headerActions}>
                {openNav && (
                  <Link to="/">
                    <Button appearance="transparent" icon={<Home20Filled />} />
                  </Link>
                )}
                <Button
                  onClick={() => setOpenNav(!openNav)}
                  appearance="transparent"
                  icon={<NavigationFilled />}
                  className={styles.hamburger}
                />
              </div>

              <div className={styles.headerAvatar}>
                <Avatar
                  size={openNav ? 48 : 32}
                  image={{
                    src: 'https://randomuser.me/api/portraits/men/21.jpg',
                  }}
                />
                {openNav && (
                  <div>
                    <p
                      className={mergeClasses(
                        styles.headerAvatarName,
                        styles.noWrap
                      )}
                    >
                      John Doe
                    </p>
                    <span
                      className={mergeClasses(
                        styles.headerAvatarRole,
                        styles.noWrap
                      )}
                    >
                      HR Department
                    </span>
                  </div>
                )}
              </div>
            </div>
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <NavDrawerBody style={{ overflowX: 'hidden' }}>
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
                  />
                );
              })}

              {navItemsMock.map(({ icon, menuName }, index) => {
                const nextValue = navItemsIcons.length + (index + 1);

                return (
                  <NavItemMock
                    icon={icon}
                    onClick={handleMockClick}
                    value={nextValue}
                    className={disableHoverEffect}
                  >
                    {openNav && menuName}
                  </NavItemMock>
                );
              })}
            </>
          )}
        </NavDrawerBody>
        <NavDrawerFooter style={{ overflowX: 'hidden' }}>
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
