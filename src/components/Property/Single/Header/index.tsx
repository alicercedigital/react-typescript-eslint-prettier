import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { IProperty } from 'src/types/Property';

interface IParams {
  editedProperty: IProperty;
}
const PropertyHeader = ({ editedProperty }: IParams) => {
  const [score, setScore] = useState();
  console.log(score, setScore, editedProperty);
  return (
    <Grid item xs={12} container>
      <Typography>{!editedProperty._id ? 'Novo imóvel' : 'Editar imóvel'}</Typography>
    </Grid>
  );
};

export default PropertyHeader;
