import { Grid, Switch, Typography } from '@mui/material';
import { FC } from 'react';

interface IParams {
  label: string;
  value: boolean;
  name: string;
  handleChange: (event: any) => void;
}

const SwitchInput: FC<IParams> = ({ label, value, name, handleChange }) => (
  <>
    <Typography
      variant="caption"
      sx={{
        opacity: 0.7,
      }}
    >
      {label}
    </Typography>
    <Grid container>
      <Switch checked={value} onChange={handleChange} name={name} size="small" />
      <Typography>{value ? 'Sim' : 'Não'}</Typography>
    </Grid>
  </>
);

export default SwitchInput;
