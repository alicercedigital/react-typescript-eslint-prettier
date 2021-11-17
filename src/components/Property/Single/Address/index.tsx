import { CircularProgress, Grid, IconButton, Tooltip } from '@mui/material';
import React, { FC, memo, useState } from 'react';
import SelectOptions from 'src/components/SelectOptions';
import { tipoOptions } from 'src/helpers/propertyOptions';
import { IDialogData } from 'src/components/SimpleDialog';
import onlyNumbersValue from 'src/helpers/formaters/onlyNumbersValue';
import Axios from 'axios';
import { ManageSearch } from '@mui/icons-material';
import { IProperty } from 'src/types/Property';
import TextInput from 'src/components/Inputs/Text';

interface IParams {
  editedProperty: IProperty;
  setEditedProperty: React.Dispatch<React.SetStateAction<IProperty>>;
  handleChangeInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  showDialog: (params: IDialogData) => void;
}

const PropertyAddress: FC<IParams> = ({
  editedProperty,
  setEditedProperty,
  handleChangeInput,
  showDialog,
}) => {
  const [loadingBuscaCep, setLoadingBuscaCep] = useState(false);
  const [errorOnCep, setErrorOnCep] = useState(false);

  const buscaCep = async () => {
    try {
      const onlyNumbersAddress = onlyNumbersValue(editedProperty.cep);

      if (onlyNumbersAddress.length === 8) {
        setErrorOnCep(false);
        setLoadingBuscaCep(true);
        const response = await Axios.get(`/users/address/cep/${onlyNumbersAddress}`);
        const addressData = response.data;
        setEditedProperty((oldFields) => ({
          ...oldFields,
          rua: addressData.logradouro,
          cidade: addressData.localidade,
          estado: addressData.uf,
          bairro: addressData.bairro,
        }));
        setLoadingBuscaCep(false);
      } else {
        setErrorOnCep(true);
      }
    } catch (error) {
      if (Axios.isAxiosError(error)) {
        showDialog({ title: 'Erro ao buscar o CEP', text: error.response?.data?.message });
      } else if (error instanceof Error) {
        showDialog({ title: 'Erro ao buscar o CEP', text: error.message });
      }
      setLoadingBuscaCep(false);
    }
  };

  return (
    <Grid container item xs={12} spacing={1} alignItems="center">
      <Grid item xs={5}>
        <SelectOptions
          title="Tipo"
          name="tipo"
          value={editedProperty.tipo}
          options={tipoOptions}
          handleChange={(event) => handleChangeInput(event)}
          width="100%"
        />
      </Grid>
      <Grid item xs={5}>
        <TextInput
          label="CEP"
          name="cep"
          value={editedProperty.cep}
          handleChange={handleChangeInput}
          error={errorOnCep}
        />
      </Grid>
      <Grid item>
        {loadingBuscaCep ? (
          <CircularProgress
            size={30}
            sx={{
              marginTop: '10px',
              marginLeft: '7px',
            }}
          />
        ) : (
          <Tooltip title="Buscar endereço">
            <IconButton onClick={buscaCep} size="large">
              <ManageSearch />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={12}>
        <TextInput
          label="Endereço"
          name="rua"
          value={editedProperty.rua}
          handleChange={handleChangeInput}
        />
      </Grid>
      <Grid item xs={6}>
        <TextInput
          label="Cidade"
          name="cidade"
          value={editedProperty.cidade}
          handleChange={handleChangeInput}
        />
      </Grid>
      <Grid item xs={6}>
        <TextInput
          label="Bairro"
          name="bairro"
          value={editedProperty.bairro}
          handleChange={handleChangeInput}
        />
      </Grid>
    </Grid>
  );
};

export default memo(PropertyAddress);
