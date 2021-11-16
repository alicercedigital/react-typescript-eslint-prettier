import { Grid } from '@mui/material';
import React, { FC, memo } from 'react';
import SelectOptions from 'src/components/SelectOptions';
import { topografiaOptions } from 'src/helpers/propertyOptions';
import { IProperty } from 'src/types/Property';
import SwitchInput from 'src/components/Inputs/Switch';
import TextInput from 'src/components/Inputs/Text';

interface IParams {
  editedProperty: IProperty;
  handleChangeInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const PropertyArea: FC<IParams> = ({ editedProperty, handleChangeInput }) => (
  <Grid container item xs={12} spacing={1}>
    <Grid item xs={4}>
      <TextInput
        label="Preço"
        name="valor"
        type="number"
        value={editedProperty.valor}
        handleChange={handleChangeInput}
      />
    </Grid>
    <Grid item xs={4}>
      <TextInput
        label="M² do Lote"
        name="areaTerreno"
        value={editedProperty.areaTerreno}
        type="number"
        handleChange={handleChangeInput}
      />
    </Grid>
    <Grid item xs={4}>
      <SwitchInput
        label="Documentação"
        name="documentacao"
        value={editedProperty.documentacao}
        handleChange={handleChangeInput}
      />
    </Grid>
    <Grid item xs={8}>
      <SelectOptions
        title="Topografia"
        name="topografia"
        value={editedProperty.topografia}
        options={topografiaOptions}
        handleChange={handleChangeInput}
        width={222}
      />
    </Grid>
    <Grid item xs={4}>
      <SwitchInput
        label="Rua asfaltada"
        name="ruaAsfaltada"
        value={editedProperty.ruaAsfaltada}
        handleChange={handleChangeInput}
      />
    </Grid>
  </Grid>
);

export default memo(PropertyArea);
