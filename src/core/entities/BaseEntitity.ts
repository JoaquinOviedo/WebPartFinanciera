
export interface IListItem {
    Id: number;
    toListItem(): Record<string, any>
}


export default abstract class BaseEntity implements IListItem {
 public Id: number;
 public Titulo: string;

 constructor(item?: any) {
  if (item != null) {
   this.Id = item.Id;
   this.Titulo = item.Title || '';
   this.mapItem(item);
  }
 }

 protected abstract mapItem(item: any): void;

 public toListItem(): Record<string, any> {
  return {
   Id: this.Id,
   Title: this.Titulo
  };
 }

} 