import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PropertiesService from 'src/services/Properties';
import { IProperty } from 'src/types/Property';

const PropertyList = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      const propertiesList = await PropertiesService.search({});
      setProperties(propertiesList);
    };

    getProperties();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertyList;
