import { Grid } from '@mui/material';
import PropertyList from 'src/components/Property/List';

const HomePage = () => (
  <Grid container justifyContent="center">
    <Grid item sx={{ maxWidth: 1200 }} padding={2}>
      <PropertyList />
    </Grid>
  </Grid>
);

export default HomePage;
