// Servicio que gestiona los portafolios en SharePoint
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { SharePointServiceBase } from '../../services/SharePointServiceBase';
import { SharePointListDataSource } from '../../services/SharePointListDataSource';
import type { IPortafolioItem, IPortafolioPayload } from './PortafolioTypes';
import type { ISharePointField } from '../../services/ISharePointConfig';

export class PortafolioService extends SharePointServiceBase {
  private readonly listName: string;
  private readonly dataSource: SharePointListDataSource<IPortafolioItem>;

  constructor(spfxContext: WebPartContext) {
    super(spfxContext, 'portafolio');
    this.listName = this.getConfig().listName || 'Portafolio';
    this.dataSource = new SharePointListDataSource<IPortafolioItem>(this.getSP(), this.listName);
  }

  public async getFields(onlyVisible: boolean = true): Promise<ISharePointField[]> {
    return await this.dataSource.getFields(onlyVisible);
  }

  public async getItems(select?: string[], filter?: string, expand?: string[]): Promise<IPortafolioItem[]> {
    return await this.dataSource.getItems(select, filter, expand);
  }

  public async getItemById(itemId: number | string): Promise<IPortafolioItem> {
    return await this.dataSource.getItemById(itemId);
  }

  public async createItem(item: IPortafolioPayload): Promise<IPortafolioItem> {
    return await this.dataSource.createItem(item as unknown as IPortafolioItem);
  }

  public async updateItem(itemId: number | string, item: Partial<IPortafolioPayload>): Promise<void> {
    await this.dataSource.updateItem(itemId, item as unknown as Partial<IPortafolioItem>);
  }

  public async deleteItem(itemId: number | string): Promise<void> {
    await this.dataSource.deleteItem(itemId);
  }
}
