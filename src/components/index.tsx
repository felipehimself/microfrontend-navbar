import { useState, useMemo } from 'react';

import {
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
} from '@fluentui/react-nav-preview';
import { Button, mergeClasses } from '@fluentui/react-components';
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
} from '@/icons';

import { NavItem } from './nav/nav-item';
import { useStyles } from '@/utils';
import { TAppRoutes } from '@/types';
import { Skeleton } from './elements/skeleton';
import { NavItem as NavItemMock } from '@fluentui/react-nav-preview';
import { Avatar } from './elements/avatar';

const navIcons = [
  { appIcon: 'Announcements', icon: <Announcements /> },
  { appIcon: 'JobPostings', icon: <JobPostings /> },
  { appIcon: 'Dashboard', icon: <Dashboard /> },
];

const navbarChannel = new BroadcastChannel('navbarChannel');

// anything as custom props in the mfe-root can be received as props here
export const Navbar = () => {
  const [openNav, setOpenNav] = useState(true);
  const [appRoutes, setAppRoutes] = useState<TAppRoutes[]>([]);
  const [isLoadinsRoutes, setIsLoadinsdRoutes] = useState(true);
  const [currentApp, setCurrentApp] = useState('');

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
    window.alert('Just a simple mock menu that could be a micro frontend');
  };

  return (
    <div className={openNav ? styles.root : styles.rootSm}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue="1"
        open
        type="inline"
        // onOpenChange={(_, { open }) => setIsOpen(open)}
        size="small"
      >
        <NavDrawerHeader>
          <NavDrawerHeaderNav>
            <div className={styles.headerContainer}>
              <Button
                onClick={() => setOpenNav(!openNav)}
                appearance="transparent"
                icon={<NavigationFilled />}
                className={styles.hamburger}
              />
              <div className={styles.headerAvatar}>
                <Avatar
                  size={openNav ? 48 : 32}
                  image={{
                    src: 'https://randomuser.me/api/portraits/men/21.jpg',
                  }}
                />
                {openNav && (
                  <div>
                    <p className={styles.headerAvatarName}>John Doe</p>
                    <p className={styles.headerAvatarRole}>HR Department</p>
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
    </div>
  );
};
