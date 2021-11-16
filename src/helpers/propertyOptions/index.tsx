import { IPropertyAcabamento, IPropertyTipo, IPropertyTopografia } from 'src/types/Property';

export const tipoOptions: IPropertyTipo[] = ['Lote', 'Casa', 'Apartamento'];
export const topografiaOptions: IPropertyTopografia[] = [
  'Plano',
  'Levemente acidentado',
  'Acidentado',
];
export const acabamentoOptions: IPropertyAcabamento[] = [
  'Muito ruim',
  'Ruim',
  'Normal',
  'Bom',
  'Alto padrão',
];
export const cidadesOptions = ['Armação de Búzios', 'Cabo Frio'];
export const bairrosOptions = ['Rasa', 'Centro'];
export const cepOptions = ['28950', '28951', '28955', '28950000'];
