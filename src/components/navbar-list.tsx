import { Inbox, List, Mail } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { TNavbarOpenProps } from 'src/types';

export const NavbarList = (props: TNavbarOpenProps) => {
  return (
    <List>
      {['App 1', 'App 2', 'App 3'].map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: props.open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: props.open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: props.open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
