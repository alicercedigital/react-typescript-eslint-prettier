import { Star } from '@mui/icons-material';
import { Grid, Rating, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IProperty } from 'src/types/Property';

interface IParams {
  editedProperty: IProperty;
}

const labels: {
  [score: number]: string;
} = {
  0: 'Novo',
  0.5: 'Horrível',
  1: 'Horrível',
  1.5: 'Muito ruim',
  2: 'Muito ruim',
  2.5: 'Ruim',
  3: 'Normal',
  3.5: 'Normal',
  4: 'Bom',
  4.5: 'Excelente',
  5: 'Perfeito',
};

const PropertyHeader = ({ editedProperty }: IParams) => {
  const [score, setScore] = useState<number>(0);
  const [scoreTips, setScoreTips] = useState<string[]>([]);

  const measureScore = (property: IProperty) => {
    let scoreAcc = 26;
    const scoreTipsAcc: string[] = [];

    if (!property.valor || !(property.valor > 0)) {
      scoreAcc -= 5;
      scoreTipsAcc.push('Informe o valor do imóvel');
    }
    if (!property.areaTerreno || !(property.areaTerreno > 0)) {
      scoreAcc -= 5;
      scoreTipsAcc.push('Informe a área total do imóvel');
    }
    if (!property.cidade) {
      scoreAcc -= 2;
      scoreTipsAcc.push('Informe a cidade');
    }
    if (!property.bairro) {
      scoreAcc -= 2;
      scoreTipsAcc.push('Informe o bairro');
    }
    if (!property.cep) {
      scoreAcc -= 1;
      scoreTipsAcc.push('Informe o CEP');
    }
    if (!property.rua) {
      scoreAcc -= 1;
      scoreTipsAcc.push('Informe o endereço');
    }
    if (property.ruaAsfaltada === undefined) {
      scoreAcc -= 1;
      scoreTipsAcc.push('Informe se a rua é ou não asfaltada');
    }
    if (property.documentacao === undefined) {
      scoreAcc -= 1;
      scoreTipsAcc.push('Informe se a documentação está OK');
    }

    if (!property.temConstrucao) {
      if (!property.topografia) {
        scoreAcc -= 3;
        scoreTipsAcc.push('Informe como é a topografia do lote');
      }
    } else {
      if (!property.areaConstruida || !(property.areaConstruida > 0)) {
        scoreAcc -= 5;
        scoreTipsAcc.push('Informe a metragem da área construida');
      }

      if (!property.acabamento) {
        scoreAcc -= 1;
        scoreTipsAcc.push('Informe como é o acabamento');
      }

      if (!property.banheiros || !(property.banheiros > 0)) {
        scoreAcc -= 1;
        scoreTipsAcc.push('Informe quantos banheiros');
      }

      if (!property.quartos || !(property.quartos > 0)) {
        scoreAcc -= 1;
        scoreTipsAcc.push('Informe quantos quartos');
      }
    }

    console.log(scoreAcc, Math.round((scoreAcc / 5.2) * 2) / 2);

    setScore(Math.round((scoreAcc / 5.2) * 2) / 2);
    setScoreTips(scoreTipsAcc);
  };

  useEffect(() => {
    measureScore(editedProperty);
  }, [editedProperty]);

  return (
    <Grid item xs={12} container direction="row" justifyContent="space-between">
      <Grid item>
        <Typography>{!editedProperty._id ? 'Novo imóvel' : 'Editar imóvel'}</Typography>
      </Grid>
      <Grid item>
        <Tooltip
          title={scoreTips.map((scoreTip) => (
            <Typography>{scoreTip}</Typography>
          ))}
        >
          <Grid container direction="column" justifyContent="center">
            <Typography variant="caption" align="center">
              Cadastro
            </Typography>
            <Typography variant="caption" align="center">
              {labels[score]}
            </Typography>
          </Grid>
        </Tooltip>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Rating
              value={score}
              readOnly
              precision={0.5}
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PropertyHeader;
