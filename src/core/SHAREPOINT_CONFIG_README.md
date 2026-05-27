# SharePoint Connection - Guía de Configuración

## 📋 Descripción

Este módulo proporciona una conexión centralizada a SharePoint para el WebPart Financiera. Incluye:

- **SharePointConnection**: Servicio principal con métodos CRUD
- **SharePointConfigManager**: Gestor de configuraciones
- **useSharePointConnection**: Hook de React para facilitar el uso
- **Tipos TypeScript**: Interfaces para mayor seguridad de tipos

## 🚀 Pasos de Configuración

### 1. Configura tus URLs de SharePoint

Edita el archivo `src/core/services/SharePointConfig.ts`:

```typescript
financiera: {
  siteUrl: 'https://tupagina.sharepoint.com/sites/tusite', // Tu URL de sitio
  listName: 'FinancieraList', // Nombre de tu lista
  listId: 'abc123...', // (Opcional) GUID de la lista
}
```

### 2. Cómo obtener la información necesaria

#### **Site URL (URL del Sitio)**
1. Ve a tu sitio de SharePoint
2. Haz clic en el ícono de engranaje ⚙️ (Configuración)
3. Copia la URL del navegador (ej: `https://tupagina.sharepoint.com/sites/tusite`)

#### **List Name (Nombre de la Lista)**
1. Ve a la lista en SharePoint
2. Haz clic en "Settings" > "List settings"
3. La URL contiene el nombre de la lista o cópialo directamente

#### **List ID (Opcional - GUID)**
1. Ve a la lista
2. Haz clic en "Settings" > "List settings"
3. En la URL verás algo como: `...ListId={abc123-def456...}`

## 📝 Ejemplos de Uso

### En un Componente React

```typescript
import React, { useEffect, useState } from 'react';
import { useSharePointConnection, ISharePointItem } from '../../core';

interface FinancieraItem extends ISharePointItem {
  Title: string;
  Monto?: number;
  Fecha?: string;
}

export const MiComponente = (props: any) => {
  const { connection, loading, error } = useSharePointConnection(
    props.spHttpClient,
    'financiera' // Clave de configuración
  );
  const [items, setItems] = useState<FinancieraItem[]>([]);

  useEffect(() => {
    if (connection) {
      loadItems();
    }
  }, [connection]);

  const loadItems = async () => {
    try {
      const data = await connection!.getItems<FinancieraItem>(
        'FinancieraList',
        // Filtro opcional (OData): "$filter=Monto gt 100"
        // Select opcional: ['Title', 'Monto']
      );
      setItems(data);
    } catch (err) {
      console.error('Error cargando items:', err);
    }
  };

  if (loading) return <div>Cargando conexión...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Items Financieros</h2>
      <ul>
        {items.map(item => (
          <li key={item.ID}>{item.Title}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Uso Directo del Servicio

```typescript
import { SharePointConnection, SharePointConfigManager } from '../core/services';

// Obtener configuración
const config = SharePointConfigManager.getConfig('financiera');

// Crear conexión
const connection = new SharePointConnection(spHttpClient, config);

// Obtener todos los items
const items = await connection.getItems('FinancieraList');

// Obtener con filtro
const items = await connection.getItems(
  'FinancieraList',
  "$filter=Monto gt 100",
  ['Title', 'Monto']
);

// Obtener un item específico
const item = await connection.getItemById('FinancieraList', 1);

// Crear item
const newItem = await connection.createItem('FinancieraList', {
  Title: 'Nuevo Registro',
  Monto: 500
});

// Actualizar item
await connection.updateItem('FinancieraList', 1, {
  Title: 'Título Actualizado'
});

// Eliminar item
await connection.deleteItem('FinancieraList', 1);
```

## 🔧 Métodos Disponibles

### `getItems<T>(listName, filter?, select?): Promise<T[]>`
Obtiene todos los items de una lista con filtros opcionales.

### `getItemById<T>(listName, itemId): Promise<T>`
Obtiene un item específico por ID.

### `createItem<T>(listName, item): Promise<T>`
Crea un nuevo item.

### `updateItem<T>(listName, itemId, item): Promise<void>`
Actualiza un item existente.

### `deleteItem(listName, itemId): Promise<void>`
Elimina un item.

## 📚 Filtros OData

Los filtros siguen la sintaxis de OData:

```typescript
// Igual a
"$filter=Title eq 'Nombre'"

// Mayor que
"$filter=Monto gt 100"

// Menor que
"$filter=Monto lt 50"

// Contiene
"$filter=substringof('texto', Title)"

// Y
"$filter=Monto gt 100 and Status eq 'Activo'"

// O
"$filter=Status eq 'Activo' or Status eq 'Pendiente'"
```

## 🛠️ Agregar Nuevas Configuraciones

```typescript
// En SharePointConfig.ts
SharePointConfigManager.addConfig('mi_nueva_config', {
  siteUrl: 'https://tupagina.sharepoint.com/sites/otrosite',
  listName: 'OtraLista',
  listId: 'otro-guid'
});

// O en código dinámicamente
import { SharePointConfigManager } from '../core/services';

SharePointConfigManager.addConfig('dinamica', {
  siteUrl: myDynamicUrl,
  listName: myDynamicListName
});
```

## ⚠️ Notas Importantes

- Asegúrate de tener permisos en SharePoint para acceder a las listas
- Los filtros OData son case-sensitive
- Las URLs deben incluir `/sites/` para sitios específicos
- SPHttpClient maneja automáticamente la autenticación en SPFx

## 📖 Estructura de Archivos

```
src/
├── core/
│   ├── services/
│   │   ├── ISharePointConfig.ts    (Interfaces)
│   │   ├── SharePointConnection.ts (Servicio principal)
│   │   ├── SharePointConfig.ts     (Configuraciones)
│   │   └── index.ts                (Exports)
│   └── hooks/
│       └── useSharePointConnection.ts (Hook React)
```

## ❓ Soporte

Para más información sobre la API REST de SharePoint, consulta:
https://learn.microsoft.com/es-es/sharepoint/dev/sp-add-ins/working-with-lists-and-list-items-with-rest
