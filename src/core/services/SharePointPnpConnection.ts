import { SPFI, spfi } from '@pnp/sp';
import { SPFx } from '@pnp/sp/behaviors/spfx';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import type { ISharePointConfig, ISharePointItem } from './ISharePointConfig';

/**
 * Implementación de conexión a SharePoint usando PnPJS
 */
export class SharePointPnpConnection {
  private config: ISharePointConfig;
  private sp: SPFI;

  constructor(spfxContext: WebPartContext, config: ISharePointConfig) {
    // Inicializar PnP con el contexto de SPFx
    this.sp = spfi().using(SPFx(spfxContext as any));
    this.config = config;
  }

  public async getItems<T extends ISharePointItem>(
    listName: string,
    filter?: string,
    select?: string[]
  ): Promise<T[]> {
    try {
      let query: any = this.sp.web.lists.getByTitle(listName).items;

      if (select && select.length > 0) {
        query = query.select(...select);
      }

      if (filter) {
        query = query.filter(filter);
      }

      const items: T[] = await query();
      return items;
    } catch (error) {
      console.error('PnP getItems error:', error);
      throw error;
    }
  }

  public async getItemById<T extends ISharePointItem>(
    listName: string,
    itemId: number | string
  ): Promise<T> {
    try {
      const item: T = await this.sp.web.lists.getByTitle(listName).items.getById(Number(itemId))();
      return item;
    } catch (error) {
      console.error('PnP getItemById error:', error);
      throw error;
    }
  }

  public async createItem<T extends ISharePointItem>(listName: string, item: T): Promise<T> {
    try {
      const res = await this.sp.web.lists.getByTitle(listName).items.add(item as any);
      // res may contain { data, item } depending on PnP version
      return (res && (res.data || res)) as T;
    } catch (error) {
      console.error('PnP createItem error:', error);
      throw error;
    }
  }

  public async updateItem<T extends ISharePointItem>(
    listName: string,
    itemId: number | string,
    item: Partial<T>
  ): Promise<void> {
    try {
      await this.sp.web.lists.getByTitle(listName).items.getById(Number(itemId)).update(item as any);
    } catch (error) {
      console.error('PnP updateItem error:', error);
      throw error;
    }
  }

  public async deleteItem(listName: string, itemId: number | string): Promise<void> {
    try {
      await this.sp.web.lists.getByTitle(listName).items.getById(Number(itemId)).delete();
    } catch (error) {
      console.error('PnP deleteItem error:', error);
      throw error;
    }
  }

  public getConfig(): ISharePointConfig {
    return this.config;
  }

  public updateConfig(config: Partial<ISharePointConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
