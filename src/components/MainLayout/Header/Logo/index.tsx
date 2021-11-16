import { Grid } from '@mui/material';

const Logo = () => (
  <Grid container justifyContent="center" alignItems="center" direction="column" marginTop={1}>
    <img src="/logo.png" alt="logo" style={{ width: 110 }} />
  </Grid>
);

export default Logo;
