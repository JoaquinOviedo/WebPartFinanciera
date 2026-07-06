import BaseEntity from './BaseEntitity';
import { MonedaBase } from "../api/portafolio/PortafolioTypes";

export default class Portafolio extends BaseEntity {

  public ID?: number;
  public Title?: string;
  public Author?: any; // persona / usuario
  public Created?: string;
  public Descripcion?: string;
  public moneda_base?: MonedaBase;

  constructor(item?: any) {
    super(item);
  }

  protected mapItem(item: any): void {
    if (!item) return;
    this.ID = item.ID || item.Id || item.Id;
    this.Title = item.Title || item.Title || '';
    this.Author = item.Author || item.Author;
    this.Created = item.Created || item.Created;
    this.Descripcion = item.Descripcion || item.Descripcion;
    this.moneda_base = item.moneda_base;
  }

  public toListItem(): any {
    return {
      ID: this.ID,
      Title: this.Title,
      Descripcion: this.Descripcion,
      moneda_base: this.moneda_base
    };
  }
}