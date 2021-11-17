import { IPropertyAcabamento, IPropertyTipo, IPropertyTopografia } from 'src/types/Property';

export const tipoOptions: IPropertyTipo[] = ['', 'Lote', 'Casa', 'Apartamento'];
export const topografiaOptions: IPropertyTopografia[] = [
  '',
  'Plano',
  'Levemente acidentado',
  'Acidentado',
];
export const acabamentoOptions: IPropertyAcabamento[] = [
  '',
  'Muito ruim',
  'Ruim',
  'Normal',
  'Bom',
  'Alto padrão',
];
