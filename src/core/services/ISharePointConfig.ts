/**
 * Interfaz de configuración para conexión a SharePoint
 */
export interface ISharePointConfig {
  siteUrl: string;
  listName?: string;
  // listId remains optional for legacy scenarios, but PnP usage only requires siteUrl and listName when querying lists.
  listId?: string;
}

/**
 * Interfaz para respuestas de SharePoint
 */
export interface ISharePointResponse<T> {
  value: T[];
  odata?: any;
}

export interface ISharePointField {
  Title: string;
  InternalName: string;
  TypeAsString: string;
  Hidden: boolean;
  ReadOnlyField: boolean;
  Required: boolean;
  [key: string]: any;
}

/**
 * Interfaz para items genéricos de SharePoint
 */
export interface ISharePointItem {
  id?: string;
  ID?: number;
  Title?: string;
  [key: string]: any;
}
