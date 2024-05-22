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
  HealthPlans,
  Announcements,
  Dashboard,
  EmployeeSpotlight,
  Interviews,
  JobPostings,
  Search,
  PerformanceReviews,
  NavigationFilled,
  Signout,
  Home20Filled,
  WeatherSunnyFilled,
  WeatherMoon20Filled,
} from '@/icons';

import { NavItem } from './nav/nav-item';
import { useStyles } from '@/utils';
import { TAppRoutes } from '@/types';
import { Skeleton } from './elements/skeleton';
import { NavItem as NavItemMock } from '@fluentui/react-nav-preview';
import { Avatar } from './elements/avatar';
import { useToaster } from '@/hooks/useToaster';
import { useThemeStore } from '@/store/theme-store';

const navIcons = [
  { appIcon: 'Announcements', icon: <Announcements /> },
  { appIcon: 'JobPostings', icon: <JobPostings /> },
  { appIcon: 'Dashboard', icon: <Dashboard /> },
];

const navbarChannel = new BroadcastChannel('navbarChannel');
const themeChannel = new BroadcastChannel('theme');

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
    themeChannel.postMessage(newTheme);
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
                      // FIXME: change to className
                      style={{ whiteSpace: 'nowrap' }}
                      className={styles.headerAvatarName}
                    >
                      John Doe
                    </p>
                    <p
                      style={{ whiteSpace: 'nowrap' }}
                      className={styles.headerAvatarRole}
                    >
                      HR Department
                    </p>
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
                const Icon = navIcons.find(
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
                    className={disableHoverEffect}
                  />
                );
              })}

              <NavItemMock
                icon={<EmployeeSpotlight />}
                onClick={handleMockClick}
                value="12"
                className={disableHoverEffect}
              >
                Employee
              </NavItemMock>

              <NavItemMock
                icon={<Search />}
                onClick={handleMockClick}
                value="13"
                className={disableHoverEffect}
              >
                Profile
              </NavItemMock>

              <NavItemMock
                icon={<PerformanceReviews />}
                onClick={handleMockClick}
                value="14"
                className={disableHoverEffect}
              >
                Performance
              </NavItemMock>

              <NavItemMock
                onClick={handleMockClick}
                icon={<HealthPlans />}
                value="15"
                className={disableHoverEffect}
              >
                Health
              </NavItemMock>

              <NavItemMock
                onClick={handleMockClick}
                icon={<Interviews />}
                value="16"
                className={disableHoverEffect}
              >
                Interviews
              </NavItemMock>
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
