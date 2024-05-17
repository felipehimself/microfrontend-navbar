import { Logout } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { TNavbarOpenProps } from "src/types";


type TNavbarFooterProps = TNavbarOpenProps & {
  handleDrawerToggle: () => void;
}

export const NavbarFooter = (props: TNavbarFooterProps) => {
  return (
    <Stack sx={{ mt: 'auto', mb: 5 }} alignItems='center' spacing={2}>
      {/* <IconButton size={props.open ? 'medium' : 'small'} onClick={props.handleDrawerToggle}>
        {props.open ? <ChevronLeft fontSize={props.open ? 'medium' : 'small'} /> : <ChevronRight fontSize={props.open ? 'medium' : 'small'} />}
      </IconButton> */}

      {props.open ?
        <Button variant='contained' color='error' size='small'>sign out</Button> :
        <IconButton size='small' aria-label="sign out">
          <Logout color='error' />
        </IconButton>}
    </Stack>
  )
}
