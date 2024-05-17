import { MicrofrontendTheme } from "@mfe-lib/styleguide";
import { Inbox, Mail } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  ThemeProvider
} from '@mui/material';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { useState } from 'react';
import { NavbarFooter } from "./navbar-footer";
import { NavBarHeader } from "./navbar-header";
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


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

// const menuItems = [
//   {
//     label: 'Dashboard',
//     icon: <Home />, // Replace with your desired icon component
//     submenu: [], // Can be empty if no submenu
//   },
//   {
//     label: 'Settings',
//     icon: <Settings />,
//     submenu: [
//       { label: 'Profile', link: '/profile' },
//       { label: 'Notifications', link: '/notifications' },
//     ],
//   },
// ];



export const Navbar = () => {

  const [open, setOpen] = useState(true);

  const handleOpenDrawer = () => setOpen(true)
  const handleCloseDrawer = () => setOpen(false)
  const handleDrawerToggle = () => setOpen(!open)

  return (
    <ThemeProvider theme={MicrofrontendTheme}>

      <Drawer
        onMouseOut={handleCloseDrawer}
        onMouseOver={handleOpenDrawer}
        variant="permanent"
        open={open}
      >

        <NavBarHeader open={open} />
        <Divider />
        <List >


          {['App 1', 'App 2', 'App 3',].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
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
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <NavbarFooter handleDrawerToggle={handleDrawerToggle} open={open} />
      </Drawer>

    </ThemeProvider>
  );
}