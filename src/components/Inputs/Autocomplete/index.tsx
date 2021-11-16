import { Autocomplete, TextField } from '@mui/material';
import { FC } from 'react';

interface IParams {
  label: string;
  name: string;
  options: string[];
  handleChange: (event: any) => void;
  error?: boolean;
}

const AutocompleteInput: FC<IParams> = ({ label, name, options, handleChange, error = false }) => (
  <Autocomplete
    disablePortal
    options={options}
    freeSolo
    onInputChange={handleChange}
    onSelect={handleChange}
    renderInput={(params) => (
      <TextField
        variant="filled"
        {...params}
        id={(Math.random() + 1).toString(36).substring(7)}
        label={label}
        fullWidth
        name={name}
        error={error}
        inputProps={{
          ...params.inputProps,
          autocomplete: 'new-password',
          form: {
            autocomplete: 'off',
          },
        }}
      />
    )}
  />
);
export default AutocompleteInput;
