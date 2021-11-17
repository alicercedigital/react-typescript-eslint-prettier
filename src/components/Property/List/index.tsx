import { Delete, Home } from '@mui/icons-material';
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
  Link as LinkMaterial,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import RightDrawer from 'src/components/RightDrawer';
import useOpenCloseSwitch from 'src/hooks/useOpenCloseSwitch';
import PropertiesService from 'src/services/Properties';
import { IProperty } from 'src/types/Property';
import Axios from 'axios';
import SimpleDialog, { IDialogData } from 'src/components/SimpleDialog';
import toRealString from 'src/helpers/formaters/toReal';
import Property from '../Single';

interface IValorMedioPorBairro {
  [bairro: string]: {
    totalValorPorAreaConstruida?: number;
    totalValorPorAreaTotal?: number;
    quantidadePorAreaConstruida?: number;
    quantidadePorAreaTotal?: number;
  };
}

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

  const [comparativoBairros, setComparativoBairros] = useState<IValorMedioPorBairro>();

  useEffect(() => {
    const arrayBairros: any = [];

    properties.forEach((property) => {
      if (property.custoPorAreaConstruida && property.custoPorAreaConstruida > 0) {
        const lastValue = arrayBairros[property.bairro]
          ? arrayBairros[property.bairro].totalValorPorAreaConstruida || 0
          : 0;
        const lastQuantity = arrayBairros[property.bairro]
          ? arrayBairros[property.bairro].quantidadePorAreaConstruida || 0
          : 0;

        arrayBairros[property.bairro] = {
          totalValorPorAreaConstruida: lastValue + property.custoPorAreaConstruida,
          quantidadePorAreaConstruida: lastQuantity + 1,
        };
      }

      if (property.custoPorAreaTotal && property.custoPorAreaTotal > 0) {
        const lastValue = arrayBairros[property.bairro]
          ? arrayBairros[property.bairro].totalValorPorAreaTotal || 0
          : 0;
        const lastQuantity = arrayBairros[property.bairro]
          ? arrayBairros[property.bairro].quantidadePorAreaTotal || 0
          : 0;

        arrayBairros[property.bairro] = {
          totalValorPorAreaTotal: lastValue + property.custoPorAreaTotal,
          quantidadePorAreaTotal: lastQuantity + 1,
        };
      }
    });

    setComparativoBairros(arrayBairros);
  }, [properties]);

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
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        handleCancel: () => handleCloseDialog(),
        handleConfirm: () => handleConfirmDelete(id),
      },
    });

    handleOpenDialog();
  };

  const getPriceSugestion = (property: IProperty, construction?: boolean) => {
    const stringAbove = 'Valor acima da média do bairro';
    const stringBelow = 'Valor abaixo da média do bairro';
    const stringMiddle = 'Valor na média do bairro';
    if (comparativoBairros) {
      const bairro = comparativoBairros[property.bairro];

      if (!bairro) {
        return '';
      }

      if (construction) {
        if (!property.custoPorAreaConstruida || property.custoPorAreaConstruida === 0) {
          return 'Dados incompletos';
        }

        if (bairro.totalValorPorAreaConstruida && bairro.totalValorPorAreaConstruida > 0) {
          const valorMedioDoBairro =
            bairro.totalValorPorAreaConstruida / (bairro.quantidadePorAreaConstruida || 1);

          if (valorMedioDoBairro > property.custoPorAreaConstruida) {
            return stringBelow;
          }
          if (valorMedioDoBairro < property.custoPorAreaConstruida) {
            return stringAbove;
          }
          return stringMiddle;
        }
        return 'Sem dados do bairro';
      }
      if (!property.custoPorAreaTotal || property.custoPorAreaTotal === 0) {
        return 'Dados incompletos';
      }

      if (bairro.totalValorPorAreaTotal && bairro.totalValorPorAreaTotal > 0) {
        const valorMedioDoBairro =
          bairro.totalValorPorAreaTotal / (bairro.quantidadePorAreaTotal || 1);

        if (valorMedioDoBairro > property.custoPorAreaTotal) {
          return stringBelow;
        }
        if (valorMedioDoBairro < property.custoPorAreaTotal) {
          return stringAbove;
        }
        return stringMiddle;
      }
      return 'Sem dados do bairro';
    }
    return '';
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Cidade</TableCell>

              <TableCell align="center">Área M²</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Preço M²</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow
                key={property._id || Math.random()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                onClick={() => handleClickProperty(property)}
              >
                <TableCell align="center">{property.tipo}</TableCell>
                <TableCell align="center">{property.cidade}</TableCell>
                <TableCell align="center">{property.areaTerreno}</TableCell>
                <TableCell align="center">
                  <Typography noWrap>R$ {toRealString(property.valor)}</Typography>
                  <Tooltip
                    title={`Contando ${
                      comparativoBairros && comparativoBairros[property.bairro]
                        ? comparativoBairros[property.bairro].quantidadePorAreaTotal
                        : '0'
                    }`}
                  >
                    <Typography noWrap variant="caption">
                      {property.custoPorAreaConstruida && property.custoPorAreaConstruida > 0
                        ? getPriceSugestion(property, true)
                        : getPriceSugestion(property, false)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    flexWrap="nowrap"
                  >
                    <Grid item container direction="column">
                      <Typography variant="caption" noWrap>
                        R$ {toRealString(property.custoPorAreaTotal)}
                      </Typography>
                      <Typography variant="caption">Área total</Typography>
                    </Grid>
                    <Grid item container direction="column">
                      <Typography variant="caption" noWrap>
                        R$ {toRealString(property.custoPorAreaConstruida)}
                      </Typography>
                      <Typography variant="caption" noWrap>
                        Construção
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="center">
                  {property.linkImobiliaria && (
                    <Tooltip title="Link da imobiliária">
                      <LinkMaterial
                        href={property.linkImobiliaria}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <IconButton size="small" onClick={(event) => event.stopPropagation()}>
                          <Home />
                        </IconButton>
                      </LinkMaterial>
                    </Tooltip>
                  )}

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
        <RightDrawer open={openProperty}>
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
