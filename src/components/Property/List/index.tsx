import { Delete } from '@mui/icons-material';
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
  Tooltip,
  Button,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import RightDrawer from 'src/components/RightDrawer';
import useOpenCloseSwitch from 'src/hooks/useOpenCloseSwitch';
import PropertiesService from 'src/services/Properties';
import { IProperty } from 'src/types/Property';
import Axios from 'axios';
import SimpleDialog, { IDialogData } from 'src/components/SimpleDialog';
import Property from '../Single';

const PropertyList = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [openProperty, handleOpenProperty, handleCloseProperty] = useOpenCloseSwitch();
  const [selectedProperty, setSelectedProperty] = useState<IProperty>();
  const [refresh, setRefresh] = useState<any>();
  const [openDialog, handleOpenDialog, handleCloseDialog] = useOpenCloseSwitch();
  const [dialogData, setDialogData] = useState<IDialogData>();

  useEffect(() => {
    const getProperties = async () => {
      const propertiesList = await PropertiesService.search({});
      setProperties(propertiesList);
    };

    getProperties();
  }, [refresh]);

  const handleClickProperty = (property?: IProperty) => {
    setSelectedProperty(property);
    handleOpenProperty();
  };

  const handleConfirmDelete = async (id: string) => {
    await Axios.delete(`/properties/${id}`);
    setRefresh(Math.random());
    handleCloseDialog();
  };

  const handleDeleteProperty = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();

    setDialogData({
      title: 'Confirmar',
      text: 'Deseja deletar este imóvel?',
      actions: {
        confirmText: 'Confirmar exclusão',
        cancelText: 'Cancelar',
        handleCancel: () => handleCloseDialog(),
        handleConfirm: () => handleConfirmDelete(id),
      },
    });

    handleOpenDialog();
  };

  return (
    <>
      <Grid container justifyContent="flex-end" alignItems="center" marginBottom={1}>
        <Button color="secondary" variant="contained" onClick={() => handleClickProperty()}>
          Novo imóvel
        </Button>
      </Grid>
      {openDialog && (
        <SimpleDialog dialogData={dialogData} open={openDialog} handleClose={handleCloseDialog} />
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Cidade</TableCell>

              <TableCell align="right">Área M²</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow
                key={property._id || Math.random()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                onClick={() => handleClickProperty(property)}
              >
                <TableCell>{property.tipo}</TableCell>
                <TableCell>{property.cidade}</TableCell>
                <TableCell align="right">{property.areaTerreno}</TableCell>
                <TableCell align="right">{property.valor}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Excluir imóvel">
                    <IconButton
                      size="small"
                      onClick={(event) => handleDeleteProperty(event, property._id || '')}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <RightDrawer open={openProperty} handleClose={handleCloseProperty}>
          <Property
            handleClose={handleCloseProperty}
            property={selectedProperty}
            setRefresh={setRefresh}
          />
        </RightDrawer>
      </TableContainer>
    </>
  );
};

export default PropertyList;
