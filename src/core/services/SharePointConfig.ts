/**
 * Configuración centralizada para conexiones a SharePoint
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza los valores de ejemplo con tus URLs reales de SharePoint
 * 2. Puedes definir múltiples configuraciones para diferentes sitios/listas
 * 3. Las URLs deben ser absolutas (ej: https://tupagina.sharepoint.com/sites/tusite)
 * 
 * EJEMPLO DE USO:
 * const config = SharePointConfigManager.getConfig('financiera');
 * const connection = new SharePointConnection(spHttpClient, config);
 */

import { ISharePointConfig } from './ISharePointConfig';

export class SharePointConfigManager {
  /**
   * Define aquí tus configuraciones de SharePoint
   * Agrupa por funcionalidad o sitio
   */
  private static readonly configs: { [key: string]: ISharePointConfig } = {
    // Ejemplo: configuración para listas financieras
    financiera: {
      siteUrl: 'https://tupagina.sharepoint.com/sites/tusite', // REEMPLAZAR
      listName: 'FinancieraList', // REEMPLAZAR
      listId: '', // REEMPLAZAR (opcional)
    },

    // Agregar más configuraciones según necesites
    // ejemplo: {
    //   siteUrl: 'https://tupagina.sharepoint.com/sites/otrosite',
    //   listName: 'OtraLista',
    //   listId: 'list-id-guid',
    // }
  };

  /**
   * Obtiene una configuración por clave
   */
  public static getConfig(key: string): ISharePointConfig {
    const config = this.configs[key];
    if (!config) {
      throw new Error(`Configuration '${key}' not found. Available keys: ${Object.keys(this.configs).join(', ')}`);
    }
    return config;
  }

  /**
   * Agrega una nueva configuración
   */
  public static addConfig(key: string, config: ISharePointConfig): void {
    this.configs[key] = config;
  }

  /**
   * Obtiene todas las configuraciones disponibles
   */
  public static getAllConfigs(): { [key: string]: ISharePointConfig } {
    return { ...this.configs };
  }

  /**
   * Valida que una configuración tenga los campos requeridos
   */
  public static validateConfig(config: ISharePointConfig): boolean {
    if (!config.siteUrl) {
      console.error('Configuration must have siteUrl');
      return false;
    }
    return true;
  }
}
