import { Avatar, Box, styled } from '@mui/material';
import { TNavbarOpenProps } from 'src/types';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const NavBarHeader = (props: TNavbarOpenProps) => {
  return (
    <DrawerHeader sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ p: 3 }}>
        <Avatar
          sx={{ width: props.open ? 56 : 34, height: props.open ? 56 : 34 }}
          alt="Remy Sharp"
          src="https://randomuser.me/api/portraits/men/21.jpg"
        />
      </Box>
    </DrawerHeader>
  );
};
