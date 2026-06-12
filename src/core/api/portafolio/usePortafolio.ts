import { useCallback, useEffect, useMemo, useState } from 'react';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { PortafolioService } from '../services/PortafolioService';
import type { IPortafolioItem, IPortafolioPayload } from '../services/PortafolioTypes';
import type { ISharePointField } from '../../services/ISharePointConfig';

export interface IUsePortafolioResult {
  fields: ISharePointField[];
  items: IPortafolioItem[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  createItem: (item: IPortafolioPayload) => Promise<IPortafolioItem>;
  updateItem: (itemId: number | string, item: Partial<IPortafolioPayload>) => Promise<void>;
  deleteItem: (itemId: number | string) => Promise<void>;
}

export const usePortafolio = (spfxContext: WebPartContext): IUsePortafolioResult => {
  const service = useMemo(() => new PortafolioService(spfxContext), [spfxContext]);
  const [fields, setFields] = useState<ISharePointField[]>([]);
  const [items, setItems] = useState<IPortafolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const [listFields, listItems] = await Promise.all([
        service.getFields(true),
        service.getItems(['ID', 'Title', 'Descripcion', 'moneda_base', 'Created', 'Author/Title'], undefined, ['Author'])
      ]);

      setFields(listFields);
      setItems(listItems);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createItem = useCallback(
    async (item: IPortafolioPayload): Promise<IPortafolioItem> => {
      const newItem = await service.createItem(item);
      await refresh();
      return newItem;
    },
    [service, refresh]
  );

  const updateItem = useCallback(
    async (itemId: number | string, item: Partial<IPortafolioPayload>): Promise<void> => {
      await service.updateItem(itemId, item);
      await refresh();
    },
    [service, refresh]
  );

  const deleteItem = useCallback(
    async (itemId: number | string): Promise<void> => {
      await service.deleteItem(itemId);
      await refresh();
    },
    [service, refresh]
  );

  return {
    fields,
    items,
    loading,
    error,
    refresh,
    createItem,
    updateItem,
    deleteItem
  };
};
