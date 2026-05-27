/**
 * Hook personalizado para usar SharePoint Connection
 * Simplifica el acceso a SharePoint desde cualquier componente React
 */

import { useEffect, useState } from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { SharePointConnection, SharePointConfigManager, ISharePointItem } from '../services';

/**
 * Hook para conectar con SharePoint
 * @param spHttpClient Cliente HTTP de SharePoint
 * @param configKey Clave de la configuración a usar
 * 
 * EJEMPLO DE USO:
 * const { connection, loading, error } = useSharePointConnection(props.spHttpClient, 'financiera');
 * 
 * if (loading) return <div>Cargando...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * 
 * const items = await connection.getItems('MiLista');
 */
export const useSharePointConnection = (
  spHttpClient: SPHttpClient,
  configKey: string
) => {
  const [connection, setConnection] = useState<SharePointConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const config = SharePointConfigManager.getConfig(configKey);
      const newConnection = new SharePointConnection(spHttpClient, config);
      setConnection(newConnection);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setConnection(null);
    } finally {
      setLoading(false);
    }
  }, [spHttpClient, configKey]);

  return { connection, loading, error };
};
