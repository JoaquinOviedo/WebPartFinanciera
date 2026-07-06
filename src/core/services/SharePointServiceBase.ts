import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { SharePointConfigManager } from './SharePointConfig';
import { SharePointConnection } from './SharePointConnection';
import type { ISharePointConfig } from './ISharePointConfig';

/**
 * Base para servicios que necesitan acceder a SharePoint.
 * Centraliza la creación y reutilización de la conexión.
 */
export class SharePointServiceBase {
  protected readonly spfxContext: WebPartContext;
  protected readonly configKey: string;
  private connection: SharePointConnection | null = null;

  constructor(spfxContext: WebPartContext, configKey: string) {
    this.spfxContext = spfxContext;
    this.configKey = configKey;
  }

  /**
   * Devuelve la conexión a SharePoint para este servicio.
   */
  protected getSP(): SharePointConnection {
    if (!this.connection) {
      const config = this.getConfig();
      this.connection = new SharePointConnection(this.spfxContext.spHttpClient, config);
    }

    return this.connection;
  }

  /**
   * Devuelve la configuración del servicio.
   */
  protected getConfig(): ISharePointConfig {
    return SharePointConfigManager.getConfig(this.configKey);
  }
}
