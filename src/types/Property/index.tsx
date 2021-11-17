export type IPropertyTipo = 'Lote' | 'Casa' | 'Apartamento';
export type IPropertyTopografia = 'Plano' | 'Levemente acidentado' | 'Acidentado';
export type IPropertyAcabamento = 'Muito ruim' | 'Ruim' | 'Normal' | 'Bom' | 'Alto padrão';

export interface IProperty {
  _id?: string;
  tipo: IPropertyTipo;
  cep?: string;
  rua?: string;
  cidade?: string;
  bairro?: string;
  estado?: string;
  imagens: string[];
  valor?: number;
  areaTerreno?: number;
  ruaAsfaltada: boolean;
  documentacao: boolean;
  topografia: IPropertyTopografia;
  custoPorAreaTotal?: number;
  temConstrucao: boolean;
  areaConstruida?: number;
  quartos?: number;
  banheiros?: number;
  garagem?: number;
  acabamento: IPropertyAcabamento;
  custoPorAreaConstruida?: number;
  observacao?: string;
  linkImobiliaria?: string;
}
