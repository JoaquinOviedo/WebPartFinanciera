import type { SharePointConnection } from './SharePointConnection';
import type { IListDataSource } from './IListDataSource';
import type { ISharePointField, ISharePointItem } from './ISharePointConfig';

/**
 * Implementación del datasource para una lista de SharePoint.
 * Encapsula la interacción concreta con una lista concreta.
 */
export class SharePointListDataSource<T extends ISharePointItem> implements IListDataSource<T> {
  constructor(
    private readonly connection: SharePointConnection,
    private readonly listName: string
  ) {}

  public async getFields(onlyVisible: boolean = true): Promise<ISharePointField[]> {
    return await this.connection.getFields(this.listName, onlyVisible);
  }

  public async getItems(select?: string[], filter?: string, expand?: string[]): Promise<T[]> {
    return await this.connection.getItems<T>(this.listName, filter, select, expand);
  }

  public async getItemById(itemId: number | string): Promise<T> {
    return await this.connection.getItemById<T>(this.listName, itemId);
  }

  public async createItem(item: Partial<T>): Promise<T> {
    return await this.connection.createItem<T>(this.listName, item as T);
  }

  public async updateItem(itemId: number | string, item: Partial<T>): Promise<void> {
    await this.connection.updateItem<T>(this.listName, itemId, item);
  }

  public async deleteItem(itemId: number | string): Promise<void> {
    await this.connection.deleteItem(this.listName, itemId);
  }
}
