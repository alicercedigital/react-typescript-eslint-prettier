import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Grid, IconButton, MenuItem, Toolbar, Menu } from '@mui/material';
import { FC, useState } from 'react';
import Logo from './Logo';

const Header: FC = () => {
  const [menuOrigin, setMenuOrigin] = useState<any>(null);

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
              <Menu
                anchorEl={menuOrigin}
                open={Boolean(menuOrigin)}
                onClose={() => setMenuOrigin(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem>Imóveis</MenuItem>
              </Menu>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={(event) => setMenuOrigin(event.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
