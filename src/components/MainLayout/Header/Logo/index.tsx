import { Grid, Typography } from '@mui/material';

const Logo = () => (
  <Grid container justifyContent="center" alignItems="center" direction="column" marginTop={1}>
    <Typography variant="h6" lineHeight={0.5}>
      Scientia
    </Typography>
    <Typography variant="h6">Imóveis</Typography>
  </Grid>
);

export default Logo;
