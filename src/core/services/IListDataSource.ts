import type { ISharePointField, ISharePointItem } from './ISharePointConfig';

export interface IListDataSource<T extends ISharePointItem> {
  getFields(onlyVisible?: boolean): Promise<ISharePointField[]>;
  getItems(select?: string[], filter?: string, expand?: string[]): Promise<T[]>;
  getItemById(itemId: number | string): Promise<T>;
  createItem(item: Partial<T>): Promise<T>;
  updateItem(itemId: number | string, item: Partial<T>): Promise<void>;
  deleteItem(itemId: number | string): Promise<void>;
}
