import { Grid } from '@mui/material';
import PropertyList from 'src/components/Property/List';

const HomePage = () => (
  <Grid container justifyContent="center">
    <Grid item padding={2} xs={12} sx={{ maxWidth: 1200 }}>
      <PropertyList />
    </Grid>
  </Grid>
);

export default HomePage;
