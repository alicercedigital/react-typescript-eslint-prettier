import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC, memo } from 'react';

interface IParams {
  title: string;
  name: string;
  value: string;
  options: string[];
  handleChange: (event: any) => void;

  width?: number | string;
}

const SelectOptions: FC<IParams> = ({ title, name, value, options, handleChange, width = 120 }) => (
  <FormControl variant="filled" sx={{ width }} size="small">
    <InputLabel>{title}</InputLabel>
    <Select value={value} onChange={handleChange} name={name}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default memo(SelectOptions);
