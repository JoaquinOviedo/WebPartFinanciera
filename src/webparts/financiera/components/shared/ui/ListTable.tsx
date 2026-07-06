import * as React from 'react';
import { DetailsList, IColumn } from '@fluentui/react';

interface Column<T> {
  key: string;
  title: string;
  onRender?: (item: T) => React.ReactNode;
}

interface ListTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey?: (row: T) => string | number;
}

export function ListTable<T extends Record<string, any>>({ columns, rows, rowKey }: ListTableProps<T>) {
  const fluentCols: IColumn[] = columns.map((c) => ({
    key: c.key,
    name: c.title,
    fieldName: c.key,
    minWidth: 100,
    onRender: c.onRender as any
  }));

  return (
    <DetailsList
      items={rows}
      columns={fluentCols}
      selectionMode={0}
      getKey={(item, index) => (rowKey ? String(rowKey(item as T)) : String(index))}
    />
  );
}

export default ListTable;
