import { Grid, Grow } from '@mui/material';
import React, { FC, memo } from 'react';
import SelectOptions from 'src/components/SelectOptions';
import { acabamentoOptions } from 'src/helpers/propertyOptions';
import { IProperty } from 'src/types/Property';
import SwitchInput from 'src/components/Inputs/Switch';
import TextInput from 'src/components/Inputs/Text';

interface IParams {
  editedProperty: IProperty;
  handleChangeInput: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const PropertyConstruction: FC<IParams> = ({ editedProperty, handleChangeInput }) => (
  <Grid item xs={12} container spacing={1}>
    <Grid item xs={4}>
      <SwitchInput
        label="Construção"
        name="temConstrucao"
        value={editedProperty.temConstrucao}
        handleChange={handleChangeInput}
      />
    </Grid>

    <Grow in={editedProperty.temConstrucao === true} mountOnEnter unmountOnExit>
      <Grid item xs={4}>
        <SelectOptions
          title="Acabamento"
          name="acabamento"
          value={editedProperty.acabamento}
          options={acabamentoOptions}
          handleChange={handleChangeInput}
          width={105}
        />
      </Grid>
    </Grow>
    <Grow in={editedProperty.temConstrucao === true} mountOnEnter unmountOnExit>
      <Grid item xs={4}>
        <TextInput
          label="M² Construção"
          name="areaConstruida"
          type="number"
          value={editedProperty.areaConstruida}
          handleChange={handleChangeInput}
        />
      </Grid>
    </Grow>
    <Grow in={editedProperty.temConstrucao === true} mountOnEnter unmountOnExit>
      <Grid item xs={4}>
        <TextInput
          label="Quartos"
          name="quartos"
          type="number"
          value={editedProperty.quartos}
          handleChange={handleChangeInput}
        />
      </Grid>
    </Grow>
    <Grow in={editedProperty.temConstrucao === true} mountOnEnter unmountOnExit>
      <Grid item xs={4}>
        <TextInput
          label="Banheiros"
          name="banheiros"
          type="number"
          value={editedProperty.banheiros}
          handleChange={handleChangeInput}
        />
      </Grid>
    </Grow>
    <Grow in={editedProperty.temConstrucao === true} mountOnEnter unmountOnExit>
      <Grid item xs={4}>
        <TextInput
          label="Garagem"
          name="garagem"
          type="number"
          value={editedProperty.garagem}
          handleChange={handleChangeInput}
        />
      </Grid>
    </Grow>
  </Grid>
);

export default memo(PropertyConstruction);
