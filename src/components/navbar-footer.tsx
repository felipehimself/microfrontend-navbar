import { useNavbarStore } from '@/store/navbar-store';
import { Logout, ArrowBack } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';

export const NavbarFooter = () => {
  const { open, selectedApp, setSelectedApp } = useNavbarStore();

  return (
    <Stack sx={{ mt: 'auto', mb: 5 }} alignItems="center" spacing={2}>
      <IconButton
        size={open ? 'medium' : 'small'}
        onClick={() => setSelectedApp('')}
      >
        {open && selectedApp && <ArrowBack />}
      </IconButton>

      {open ? (
        <Button variant="contained" color="error" size="small">
          sign out
        </Button>
      ) : (
        <IconButton size="small" aria-label="sign out">
          <Logout color="error" />
        </IconButton>
      )}
    </Stack>
  );
};
