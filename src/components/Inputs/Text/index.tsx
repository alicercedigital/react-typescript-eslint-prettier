import { TextField } from '@mui/material';
import { FC } from 'react';

interface IParams {
  label: string;
  value?: string | number;
  name: string;
  error?: boolean;
  type?: 'text' | 'number';
  handleChange: (event: any) => void;
}

const TextInput: FC<IParams> = ({
  label,
  value,
  name,
  error = false,
  type = 'text',
  handleChange,
}) => (
  <TextField
    variant="filled"
    label={label}
    name={name}
    value={value}
    fullWidth
    type={type}
    onChange={handleChange}
    error={error}
    size="small"
  />
);

export default TextInput;
