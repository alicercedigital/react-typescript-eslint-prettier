import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { FC } from 'react';
import RightDrawer from 'src/components/RightDrawer';
import useOpenCloseSwitch from 'src/hooks/useOpenCloseSwitch';
import Logo from './Logo';
import Property from '../../Property/Single';

const Header: FC = () => {
  const [openProperty, handleOpenProperty, handleCloseProperty] = useOpenCloseSwitch();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Logo />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between" alignItems="center">
              <Button color="secondary" variant="contained" onClick={handleOpenProperty}>
                + Imóvel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <RightDrawer open={openProperty}>
        <Property handleClose={handleCloseProperty} />
      </RightDrawer>
    </AppBar>
  );
};
export default Header;
