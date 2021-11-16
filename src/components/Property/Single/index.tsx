import { Button, Divider, Grid, Paper, TextField } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import newProperty from 'src/helpers/newProperty';
import { IProperty } from 'src/types/Property';
import Axios from 'axios';
import useOpenCloseSwitch from 'src/hooks/useOpenCloseSwitch';
import SimpleDialog, { IDialogData } from 'src/components/SimpleDialog';
import LoadingBackdrop from 'src/components/LoadingBackdrop';
import PropertyAddress from './Address';
import PropertyArea from './Area';
import PropertyConstruction from './Construction';

interface IParams {
  property?: IProperty;
  handleClose: () => void;
}

const Property: FC<IParams> = ({ property = newProperty, handleClose }) => {
  const [editedProperty, setEditedProperty] = useState(property);

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
      const response = await Axios.post(`/properties`, editedProperty);
      console.log(response.data);
      setLoadingSave(false);
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        showDialog({ title: 'Erro salvar imóvel', text: error.response?.data?.message });
      } else if (error instanceof Error) {
        showDialog({ title: 'Erro salvar imóvel', text: error.message });
      }
      setLoadingSave(false);
    }
  }, [editedProperty]);

  return (
    <>
      <Grid container direction="column" sx={{ padding: 1.5 }}>
        <Grid container item alignItems="center" spacing={1} justifyContent="space-between">
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
            <Grid item xs={6}>
              <TextField
                label="Custo por m² construido"
                name="custoPorAreaConstruida"
                value={editedProperty.custoPorAreaConstruida}
                fullWidth
                disabled
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Custo por m² total"
                name="custoPorAreaTotal"
                value={editedProperty.custoPorAreaTotal}
                fullWidth
                size="small"
                disabled
              />
            </Grid>
          </Grid>

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
          width: 360,
          bottom: -10,
          marginBottom: 1,
          padding: 1,
          zIndex: 100,
        }}
      >
        <Grid item xs={12} container justifyContent="space-between">
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Salvar
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default memo(Property);
