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
            <TableCell>Tipo</TableCell>
            <TableCell>Cidade</TableCell>

            <TableCell align="right">Área M²</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((row) => (
            <TableRow
              key={row._id || Math.random()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.cidade}</TableCell>
              <TableCell align="right">{row.areaTerreno}</TableCell>
              <TableCell align="right">{row.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PropertyList;
