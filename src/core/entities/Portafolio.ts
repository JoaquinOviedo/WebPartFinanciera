import BaseEntity from '';
import { MonedaBase } from "../api/portafolio/PortafolioTypes";

export default class DMCilc extends BaseEntity {

  public ID: number;
  public Title: string;
  public Author: any; // persona / usuario
  public Created: string;
  public Descripcion: string;
  public moneda_base: MonedaBase;

  constructor(item?: any) {
    super(item);
  }

  protected mapItem(item: any): void {

    
    }

  public toListItem(): any {
    return Utils.removeUndefinedNull({

    });
  }
}