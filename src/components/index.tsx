import * as React from 'react';

import {
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerHeaderNav,
} from '@fluentui/react-nav-preview';
import { Button } from '@fluentui/react-components';
import {
  HealthPlans,
  TrainingPrograms,
  CareerDevelopment,
  Analytics,
  Reports,
  Settings,
  Announcements,
  Dashboard,
  EmployeeSpotlight,
  Interviews,
  JobPostings,
  Person,
  Search,
  PerformanceReviews,
  NavigationFilled,
} from '@/icons';

import { NavItem } from './nav/nav-item';
import { NavSubmenu } from './elements/nav-submenu';
import { useStyles } from '@/utils';
import { TAppRoutes } from '@/types';
import { Skeleton } from './elements/skeleton';
import { NavItem as NavItemMock } from '@fluentui/react-nav-preview';

const navIcons = [
  { appIcon: 'Announcements', icon: <Announcements /> },
  { appIcon: 'JobPostings', icon: <JobPostings /> },
  { appIcon: 'Dashboard', icon: <Dashboard /> },
];

const navbarChannel = new BroadcastChannel('navbarChannel');

// anything as custom props in the mfe-root can be received as props here
export const Navbar = () => {
  const [openNav, setOpenNav] = React.useState(true);
  const [appRoutes, setAppRoutes] = React.useState<TAppRoutes[]>([]);
  const [isLoadinsRoutes, setIsLoadinsdRoutes] = React.useState(true);
  const [currentApp, setCurrentApp] = React.useState('');

  navbarChannel.onmessage = (e) => {
    const mfeRoutes = e.data as TAppRoutes[];
    const sorted = mfeRoutes.sort((a, b) => a.appName.localeCompare(b.appName));
    setAppRoutes(sorted);
    setIsLoadinsdRoutes(false);
    navbarChannel.close();
  };

  const styles = useStyles();

  const disableHoverEffect = React.useMemo(() => {
    return openNav ? undefined : styles.noHover;
  }, [openNav]);

  const handleNavClick = (appName: string) => {
    setCurrentApp(appName);
    setOpenNav(true);
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
            <Button
              onClick={() => setOpenNav(!openNav)}
              appearance="transparent"
              icon={<NavigationFilled />}
              className={styles.hamburger}
            />
          </NavDrawerHeaderNav>
        </NavDrawerHeader>
        <NavDrawerBody style={{ overflowX: 'hidden' }}>
          {isLoadinsRoutes ? (
            <Skeleton />
          ) : (
            appRoutes.map((item, index) => {
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
            })
          )}

          {/* {!isLoadinsRoutes &&
                appRoutes.map((item, index) => {
                  const Icon = navIcons.find(
                    (navIcon) => navIcon.appIcon === item.appIcon
                  )?.icon;

                  return (
                    <NavItem
                      appName={item.appName}
                      icon={Icon}
                      routes={item.routes}
                      open={openNav}
                      path={item.path}
                      value={index}
                    />
                  );
                })} */}

          {/* {appRoutes?.map(({ appName, routes, appIcon }, index) => {
                const childrenLength = routes.length;

                return childrenLength == 1 ? (
                  <NavItem
                    icon={<Announcements />}
                    value={useId()}
                    menuName={appName}
                    className={applyHoverEffect}
                    open={openNav}
                    to={routes[0].path!}
                  />
                ) : (
                  <NavSubmenu
                    icon={<JobPostings />}
                    onClick={() => setOpenNav(true)}
                    open={openNav}
                    menuName={appName}
                    value={index}
                    className={applyHoverEffect}
                    routes={routes}
                  />
                );
              })} */}

          {/* <NavItem
                target="_blank"
                icon={<Dashboard />}
                onClick={() => {}}
                value="2"
                menuName="Dashboard"
                className={applyHoverEffect}
                open={openNav}
                to="announcements"
              /> */}

          {/* <NavSubmenu
                icon={<JobPostings />}
                onClick={() => setOpenNav(true)}
                open={openNav}
                menuName="Job Postings"
                value={(Math.random() + 1).toString(36).substring(7)}
                className={applyHoverEffect}
              /> */}

          {/* <NavItem
                target="_blank"
                icon={<Announcements />}
                onClick={() => {}}
                value="3"
                menuName="Announcements"
                className={applyHoverEffect}
                open={openNav}
              /> */}
          {/* <NavSubmenu
                icon={<JobPostings />}
                onClick={() => setOpenNav(true)}
                open={openNav}
                menuName="Job Postings"
                value={(Math.random() + 1).toString(36).substring(7)}
                className={applyHoverEffect}
              /> */}
          {/* Static only for the sake of simplicity... */}
          {/* <NavItem
                target="_blank"
                icon={<EmployeeSpotlight />}
                onClick={() => {}}
                value="3"
                menuName="Employee Spotlight"
                className={applyHoverEffect}
                open={openNav}
              />
              <NavItem
                target="_blank"
                icon={<Search />}
                onClick={() => {}}
                value="4"
                menuName="Profile Search"
                className={applyHoverEffect}
                open={openNav}
              />
              <NavItem
                target="_blank"
                icon={<PerformanceReviews />}
                onClick={() => {}}
                value="5"
                menuName="Performance Reviews"
                className={applyHoverEffect}
                open={openNav}
              />
              <NavItem
                target="_blank"
                icon={<Interviews />}
                value="9"
                menuName="Interviews"
                open={openNav}
                className={openNav ? undefined : applyHoverEffect}
              />
              <NavItem
                icon={<HealthPlans />}
                value="10"
                menuName="Health Plans"
                open={openNav}
                className={applyHoverEffect}
              />
              <NavSubmenu
                icon={<Person />}
                onClick={() => setOpenNav(true)}
                open={openNav}
                menuName="Retirement"
                value={(Math.random() + 1).toString(36).substring(7)}
                className={applyHoverEffect}
              />
              <NavItem
                target="_blank"
                menuName="Training"
                icon={<TrainingPrograms />}
                value="15"
                open={openNav}
                className={applyHoverEffect}
              />
              <NavSubmenu
                icon={<CareerDevelopment />}
                onClick={() => setOpenNav(true)}
                open={openNav}
                menuName="Career Development"
                value={(Math.random() + 1).toString(36).substring(7)}
                className={applyHoverEffect}
              />
              <NavItem
                target="_blank"
                onClick={() => {}}
                icon={<Analytics />}
                value="19"
                menuName="Workforce Data"
                className={applyHoverEffect}
                open={openNav}
              />
              <NavItem
                target="_blank"
                onClick={() => {}}
                icon={<Reports />}
                value="20"
                menuName="Reports"
                className={applyHoverEffect}
                open={openNav}
              /> */}
        </NavDrawerBody>
        <NavDrawerFooter style={{ overflowX: 'hidden' }}>
          {/* <NavItemMock
            value="21"

            onClick={someClickHandler}
            icon={<Person />}
          >
            Profile
          </NavItemMock>
          <NavItemMock
            icon={<Settings />}
  
            onClick={someClickHandler}
            value="24"
          >
            App Settings
          </NavItemMock> */}

          {/* <NavItem
                value="21"
                target="_blank"
                onClick={() => {}}
                icon={<Person />}
                menuName="Profile"
                className={applyHoverEffect}
                open={openNav}
              />
              <NavItem
                icon={<Settings />}
                target="_blank"
                onClick={() => {}}
                value="24"
                menuName="Settings"
                className={applyHoverEffect}
                open={openNav}
              /> */}
        </NavDrawerFooter>
      </NavDrawer>
    </div>
  );
};
