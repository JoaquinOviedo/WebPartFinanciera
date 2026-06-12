// Servicio que gestiona los portafolios en SharePoint
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { SharePointConfigManager } from '../../services/SharePointConfig';
import { SharePointConnection } from '../../services/SharePointConnection';
import type { IPortafolioItem, IPortafolioPayload } from './PortafolioTypes';
import type { ISharePointField } from '../../services/ISharePointConfig';

export class PortafolioService {
  private readonly connection: SharePointConnection;
  private readonly listName: string;

  constructor(spfxContext: WebPartContext) {
    const config = SharePointConfigManager.getConfig('portafolio');
    this.connection = new SharePointConnection(spfxContext.spHttpClient, config);
    this.listName = config.listName || 'Portafolio';
  }

  public async getFields(onlyVisible: boolean = true): Promise<ISharePointField[]> {
    return await this.connection.getFields(this.listName, onlyVisible);
  }

  public async getItems(select?: string[], filter?: string, expand?: string[]): Promise<IPortafolioItem[]> {
    return await this.connection.getItems<IPortafolioItem>(this.listName, filter, select, expand);
  }

  public async getItemById(itemId: number | string): Promise<IPortafolioItem> {
    return await this.connection.getItemById<IPortafolioItem>(this.listName, itemId);
  }

  public async createItem(item: IPortafolioPayload): Promise<IPortafolioItem> {
    return await this.connection.createItem<IPortafolioItem>(this.listName, item as any);
  }

  public async updateItem(itemId: number | string, item: Partial<IPortafolioPayload>): Promise<void> {
    await this.connection.updateItem<IPortafolioItem>(this.listName, itemId, item as any);
  }

  public async deleteItem(itemId: number | string): Promise<void> {
    await this.connection.deleteItem(this.listName, itemId);
  }
}
