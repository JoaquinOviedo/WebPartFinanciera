import type { ISharePointItem } from './ISharePointConfig';

export interface IPortafolioItem extends ISharePointItem {
  ID?: number;
  Title?: string;
  Author?: any; // persona / usuario
  Created?: string;
  Descripcion?: string;
  moneda_base?: string;
}

export interface IPortafolioPayload {
  Title: string;
  Descripcion?: string;
  moneda_base?: string;
  AuthorId?: number;
}
