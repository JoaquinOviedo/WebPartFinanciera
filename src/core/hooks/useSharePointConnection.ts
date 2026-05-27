/**
 * Hook personalizado para usar SharePoint Connection
 * Simplifica el acceso a SharePoint desde cualquier componente React
 */

import { useEffect, useState } from 'react';
import { SharePointConfigManager, SharePointPnpConnection } from '../services';
import type { WebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Hook para conectar con SharePoint usando PnPJS
 * @param configKey Clave de la configuración a usar
 * @param spfxContext Contexto de SPFx requerido para PnP
 * 
 * EJEMPLO DE USO:
 * const { connection, loading, error } = useSharePointConnection('financiera', this.context);
 * 
 * if (loading) return <div>Cargando...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * 
 * const items = await connection.getItems('MiLista');
 */
export const useSharePointConnection = (
  configKey: string,
  spfxContext: WebPartContext
) => {
  const [connection, setConnection] = useState<SharePointPnpConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const config = SharePointConfigManager.getConfig(configKey);
      const pnpConnection = new SharePointPnpConnection(spfxContext, config);
      setConnection(pnpConnection);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setConnection(null);
    } finally {
      setLoading(false);
    }
  }, [configKey, spfxContext]);

  return { connection, loading, error };
};
