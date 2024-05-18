import { ExpandMore, Inbox, List } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { AppRoutes } from '@/types';

type TNavbarSubmenuList = AppRoutes & { open: boolean };

export const NavbarSubmenuList = (props: TNavbarSubmenuList) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {props.appName}
      </AccordionSummary>
      {props.routes.map(({ menuChildren }) => {
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
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemText
                        primary={submenuName}
                        sx={{ opacity: props.open ? 1 : 0 }}
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
  );
};
