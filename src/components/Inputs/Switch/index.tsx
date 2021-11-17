import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface IParams {
  label: string;
  value?: boolean;
  name: string;
  handleChange: (event: any) => void;
}

const SwitchInput: FC<IParams> = ({ label, value, name, handleChange }) => (
  <Grid container alignItems="flex-start">
    <Typography
      variant="caption"
      sx={{
        opacity: 0.7,
      }}
    >
      {label}
    </Typography>
    <Grid container>
      <ButtonGroup variant="contained" sx={{ maxHeight: '28px' }}>
        <Button
          size="small"
          color={value === false ? 'primary' : 'inherit'}
          sx={{ color: value === false ? '#fff' : '#777' }}
          onClick={() =>
            handleChange({
              target: {
                value: false,
                name,
              },
            })
          }
        >
          Não
        </Button>
        <Button
          size="small"
          color={value === true ? 'primary' : 'inherit'}
          sx={{ color: value === true ? '#fff' : '#777' }}
          onClick={() =>
            handleChange({
              target: {
                value: true,
                name,
              },
            })
          }
        >
          Sim
        </Button>
      </ButtonGroup>
    </Grid>
  </Grid>
);

export default SwitchInput;
