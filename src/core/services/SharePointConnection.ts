import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ISharePointConfig, ISharePointResponse, ISharePointItem } from './ISharePointConfig';

/**
 * Servicio para manejar conexiones a SharePoint
 * Proporciona métodos para interactuar con listas y librerías de documentos
 */
export class SharePointConnection {
  private spHttpClient: SPHttpClient;
  private config: ISharePointConfig;

  constructor(spHttpClient: SPHttpClient, config: ISharePointConfig) {
    this.spHttpClient = spHttpClient;
    this.config = config;
  }

  /**
   * Obtiene todos los items de una lista
   * @param listName Nombre de la lista
   * @param filter Filtro OData (opcional)
   * @param select Campos a seleccionar (opcional)
   */
  public async getItems<T extends ISharePointItem>(
    listName: string,
    filter?: string,
    select?: string[]
  ): Promise<T[]> {
    try {
      const queryUrl = this.buildListUrl(listName, filter, select);
      const response: SPHttpClientResponse = await this.spHttpClient.get(
        queryUrl,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Error fetching items: ${response.statusText}`);
      }

      const data: ISharePointResponse<T> = await response.json();
      return data.value;
    } catch (error) {
      console.error('Error in getItems:', error);
      throw error;
    }
  }

  /**
   * Obtiene un item específico por ID
   * @param listName Nombre de la lista
   * @param itemId ID del item
   */
  public async getItemById<T extends ISharePointItem>(
    listName: string,
    itemId: number | string
  ): Promise<T> {
    try {
      const queryUrl = `${this.config.siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`;
      const response: SPHttpClientResponse = await this.spHttpClient.get(
        queryUrl,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        throw new Error(`Error fetching item: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getItemById:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo item en una lista
   * @param listName Nombre de la lista
   * @param item Datos del item a crear
   */
  public async createItem<T extends ISharePointItem>(
    listName: string,
    item: T
  ): Promise<T> {
    try {
      const queryUrl = `${this.config.siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;
      const response: SPHttpClientResponse = await this.spHttpClient.post(
        queryUrl,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error(`Error creating item: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in createItem:', error);
      throw error;
    }
  }

  /**
   * Actualiza un item existente
   * @param listName Nombre de la lista
   * @param itemId ID del item a actualizar
   * @param item Datos actualizados
   */
  public async updateItem<T extends ISharePointItem>(
    listName: string,
    itemId: number | string,
    item: Partial<T>
  ): Promise<void> {
    try {
      const queryUrl = `${this.config.siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`;
      const response: SPHttpClientResponse = await this.spHttpClient.post(
        queryUrl,
        SPHttpClient.configurations.v1,
        {
          body: JSON.stringify(item),
          headers: {
            'X-HTTP-Method': 'MERGE',
            'If-Match': '*',
          },
        }
      );

      if (!response.ok && response.status !== 204) {
        throw new Error(`Error updating item: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error in updateItem:', error);
      throw error;
    }
  }

  /**
   * Elimina un item
   * @param listName Nombre de la lista
   * @param itemId ID del item a eliminar
   */
  public async deleteItem(listName: string, itemId: number | string): Promise<void> {
    try {
      const queryUrl = `${this.config.siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`;
      const response: SPHttpClientResponse = await this.spHttpClient.post(
        queryUrl,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'X-HTTP-Method': 'DELETE',
            'If-Match': '*',
          },
        }
      );

      if (!response.ok && response.status !== 204) {
        throw new Error(`Error deleting item: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error in deleteItem:', error);
      throw error;
    }
  }

  /**
   * Construye la URL de consulta OData
   */
  private buildListUrl(listName: string, filter?: string, select?: string[]): string {
    let queryUrl = `${this.config.siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;

    const params: string[] = [];

    if (select && select.length > 0) {
      params.push(`$select=${select.join(',')}`);
    }

    if (filter) {
      params.push(`$filter=${filter}`);
    }

    if (params.length > 0) {
      queryUrl += `?${params.join('&')}`;
    }

    return queryUrl;
  }

  /**
   * Obtiene la configuración actual
   */
  public getConfig(): ISharePointConfig {
    return this.config;
  }

  /**
   * Actualiza la configuración
   */
  public updateConfig(config: Partial<ISharePointConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
