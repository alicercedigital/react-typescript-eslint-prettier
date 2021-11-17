import { Button, Divider, Grid, Paper, TextField } from '@mui/material';
import React, { FC, memo, useCallback, useState } from 'react';
import newProperty from 'src/helpers/newProperty';
import { IProperty } from 'src/types/Property';
import Axios from 'axios';
import useOpenCloseSwitch from 'src/hooks/useOpenCloseSwitch';
import SimpleDialog, { IDialogData } from 'src/components/SimpleDialog';
import LoadingBackdrop from 'src/components/LoadingBackdrop';
import TextInput from 'src/components/Inputs/Text';
import { ArrowBackIos, Save } from '@mui/icons-material';
import PropertyAddress from './Address';
import PropertyArea from './Area';
import PropertyImage from './Image';
import PropertyConstruction from './Construction';
import PropertyHeader from './Header';

interface IParams {
  property?: IProperty;
  handleClose: () => void;
  setRefresh: React.Dispatch<any>;
}

const Property: FC<IParams> = ({ property = newProperty, handleClose, setRefresh }) => {
  const [editedProperty, setEditedProperty] = useState(property);
  const [newImagesFiles, setNewImagesFiles] = useState<FileList>();

  const handleChangeInput = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setEditedProperty((oldValues) => ({
      ...oldValues,
      [name]: type !== 'checkbox' ? value : checked,
    }));
  }, []);

  const [loadingSave, setLoadingSave] = useState(false);
  const [openDialog, handleOpenDialog, handleCloseDialog] = useOpenCloseSwitch();
  const [dialogData, setDialogData] = useState<IDialogData>();
  const showDialog = (params: IDialogData) => {
    setDialogData({
      title: params.title,
      text: params.text,
    });
    handleOpenDialog();
  };

  const handleSave = useCallback(async () => {
    try {
      setLoadingSave(true);

      const formData = new FormData();

      if (newImagesFiles) {
        for (let i = 0; i < newImagesFiles.length; i += 1) {
          formData.append('image', newImagesFiles[i]);
        }
      }

      formData.append('data', JSON.stringify(editedProperty));

      const response = await Axios.post(`/properties`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      setLoadingSave(false);
      setEditedProperty(response.data);
      setRefresh(Math.random());
      handleClose();
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        showDialog({ title: 'Erro salvar imóvel', text: error.response?.data?.message });
      } else if (error instanceof Error) {
        showDialog({ title: 'Erro salvar imóvel', text: error.message });
      }
      setLoadingSave(false);
    }
  }, [editedProperty, newImagesFiles]);

  return (
    <>
      <Grid container direction="column" sx={{ padding: 1.5 }}>
        <Grid container item alignItems="center" spacing={1} justifyContent="space-between">
          <PropertyHeader editedProperty={editedProperty} />
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <PropertyAddress
            editedProperty={editedProperty}
            setEditedProperty={setEditedProperty}
            handleChangeInput={handleChangeInput}
            showDialog={showDialog}
          />
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <PropertyArea editedProperty={editedProperty} handleChangeInput={handleChangeInput} />
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <PropertyConstruction
            editedProperty={editedProperty}
            handleChangeInput={handleChangeInput}
          />
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} container spacing={1} marginTop={1}>
            <Grid item xs={12}>
              <TextInput
                label="Observações"
                name="observacao"
                value={editedProperty.observacao}
                handleChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="Link Imobiliária"
                name="linkImobiliaria"
                value={editedProperty.linkImobiliaria}
                handleChange={handleChangeInput}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={1} marginTop={1}>
            <Grid item xs={6}>
              <TextField
                label="Custo por m² construido"
                name="custoPorAreaConstruida"
                value={
                  editedProperty &&
                  editedProperty.valor &&
                  editedProperty.areaConstruida &&
                  editedProperty.valor > 0 &&
                  editedProperty.areaConstruida > 0
                    ? editedProperty.valor / editedProperty.areaConstruida
                    : 'Dados não informados'
                }
                fullWidth
                disabled
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Custo por m² total"
                name="custoPorAreaTotal"
                value={
                  editedProperty &&
                  editedProperty.valor &&
                  editedProperty.areaTerreno &&
                  editedProperty.valor > 0 &&
                  editedProperty.areaTerreno > 0
                    ? editedProperty.valor / editedProperty.areaTerreno
                    : 'Dados não informados'
                }
                fullWidth
                size="small"
                disabled
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <PropertyImage
            newImagesFiles={newImagesFiles}
            setNewImagesFiles={setNewImagesFiles}
            editedProperty={editedProperty}
          />
          {loadingSave && <LoadingBackdrop />}
          {openDialog && (
            <SimpleDialog
              dialogData={dialogData}
              open={openDialog}
              handleClose={handleCloseDialog}
            />
          )}
        </Grid>
      </Grid>
      <Paper
        sx={{
          position: 'fixed',
          width: 380,
          bottom: -10,
          borderRadius: 0,
          marginBottom: 1,
          padding: '8px 22px 10px 11px',
          zIndex: 100,
        }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Button onClick={handleClose} color="inherit" startIcon={<ArrowBackIos />}>
            Cancelar
          </Button>

          <Button onClick={handleSave} color="primary" variant="contained" startIcon={<Save />}>
            Salvar
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default memo(Property);
