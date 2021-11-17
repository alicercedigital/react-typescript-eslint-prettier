import { AppBar, Button, Grid, Toolbar } from '@mui/material';
import { FC } from 'react';
import Logo from './Logo';

const Header: FC = () => (
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
            <Button color="secondary" variant="contained">
              Imóveis
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);
export default Header;
