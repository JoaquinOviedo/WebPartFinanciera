import type { ISharePointItem } from './ISharePointConfig';

export type MonedaBase = 'USD' | 'ARS';

export interface IPortafolioItem extends ISharePointItem {
  ID?: number;
  Title?: string;
  Author?: any; // persona / usuario
  Created?: string;
  Descripcion?: string;
  moneda_base?: MonedaBase;
}

export interface IPortafolioPayload {
  Title: string;
  Descripcion?: string;
  moneda_base?: MonedaBase;
  AuthorId?: number;
}
