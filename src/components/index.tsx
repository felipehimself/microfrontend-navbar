import { MicrofrontendTheme } from '@mfe-lib/styleguide';
import { ExpandLess, ExpandMore, Inbox, Mail } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { NavbarFooter } from './navbar-footer';
import { NavBarHeader } from './navbar-header';
import { useNavbarStore } from '@/store/navbar-store';
import { NavbarSubmenuList } from './navbar-submenu-list';
const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

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

const navbarChannel = new BroadcastChannel('navbarChannel');

export const Navbar = () => {
  const { routes, selectedApp, open, setRoutes, setSelectedApp, setOpen } =
    useNavbarStore();

  navbarChannel.onmessage = (e) => {
    const mfeRoutes = e.data as AppRoutes[];
    setRoutes(mfeRoutes);
    navbarChannel.close();
  };

  const handleOpenDrawer = () => setOpen(true);
  const handleCloseDrawer = () => setOpen(false);

  const appRoutes = useMemo(() => {
    return selectedApp == ''
      ? routes
      : routes.filter((route) => route.appName === selectedApp);
  }, [selectedApp, routes]);

  return (
    <ThemeProvider theme={MicrofrontendTheme}>
      <Drawer
        onMouseLeave={handleCloseDrawer}
        onMouseEnter={handleOpenDrawer}
        variant="permanent"
        open={open}
      >
        <NavBarHeader open={open} />
        <Divider />
        <List>
          {appRoutes.map(({ appName, routes, appIcon }) => (
            <ListItem key={appName} disablePadding sx={{ display: 'block' }}>
              {selectedApp !== '' && selectedApp === appName ? null : (
                <ListItemButton
                  onClick={() => setSelectedApp(appName)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Inbox />
                  </ListItemIcon>
                  <ListItemText
                    primary={appName}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              )}
              {/* FIXME: essa verificação faz com que o item suma da tela, open se não está open, nao mostra o accordion */}
              {open && selectedApp === appName && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Inbox /> <Typography>{appName}</Typography>
                  </AccordionSummary>
                  {routes.map(({ menuChildren }) => {
                    return (
                      <>
                        {menuChildren.map(({ submenuName, path }) => {
                          return (
                            <List>
                              <ListItem
                                key={submenuName}
                                disablePadding
                                sx={{ display: 'block' }}
                              >
                                <ListItemButton
                                  sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                  }}
                                >
                                  <ListItemText
                                    primary={submenuName + '+'}
                                    sx={{ opacity: open ? 1 : 0 }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </List>
                          );
                        })}
                      </>
                    );
                  })}
                </Accordion>
              )}
            </ListItem>
          ))}
        </List>

        <NavbarFooter />
      </Drawer>
    </ThemeProvider>
  );
};
