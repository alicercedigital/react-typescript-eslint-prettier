import { Menu } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar } from '@mui/material';
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
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);
export default Header;
