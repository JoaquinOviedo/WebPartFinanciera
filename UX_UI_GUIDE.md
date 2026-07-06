# Guía de UX/UI - Financiera WebPart v2.0

## Descripción General
Aplicación SharePoint para gestión de jerarquías financieras con interfaz moderna, intuitiva y responsiva.

## Paleta de Colores
- **Primario**: `#0B5DAA` (Azul YPF) - botones principales, tabs activos
- **Secundario**: `#E8751C` (Naranja) - Galería, acciones complementarias
- **Terciario**: `#6A4A9C` (Púrpura) - Gráficas, análisis
- **Fondo**: `#f5f5f5` (Gris claro) - contenedores y secciones
- **Texto Oscuro**: `#031330` (Azul muy oscuro) - títulos y texto principal
- **Texto Secundario**: `#666` - etiquetas, descripción

## Estructura de Pantallas

### 1. **Header** (`Header.tsx`)
**Propósito**: Barra de navegación superior con identificación del usuario

**Componentes**:
- Logo/Título: "Ideas YPF" (texto estático, 1.2rem, fontWeight 600)
- Sección derecha: Nombre del usuario + foto de perfil
- Sin menú hamburguesa (menú eliminado)

**Styles**: 
- Fondo blanco, altura fija
- Flexbox horizontal con justifyContent space-between
- Bordo inferior: 1px solid rgba(0,0,0,0.06)

---

### 2. **Home** (`Home.tsx`)
**Propósito**: Página de bienvenida con acceso rápido a funcionalidades

**Layout**: Dos columnas
- **Columna Izquierda (40%)**:
  - Tarjeta de bienvenida con:
    - Ícono (ms-Icon ms-Icon--WaffleOffice365)
    - Título: "¡Bienvenido!" + nombre del usuario
    - Mensaje descriptivo
    - Avatar del usuario

- **Columna Derecha (60%)**:
  - 3 botones de navegación en grid (1 columna, 3 filas):
    - **Galería** (#E8751C, icon: NumberField)
    - **Gráfica** (#6A4A9C, icon: AnalyticsReport)
    - **Administración** (#0B5DAA, icon: Adjustments)

**Estilos de Botones**:
- minHeight: 140px
- fontWeight: 700 (bold)
- fontSize: 1.1rem
- Ícono en lado derecho (fontSize: 2.8rem)
- Texto alineado a izquierda
- Hover: transform translateY(-2px), boxShadow mejorada
- Transición: all 0.3s ease

**Responsive**:
- En pantallas < 1024px: cambiar a 1 columna
- En pantallas < 640px: botones en stack vertical

---

### 3. **Administración** (`Administracion.tsx`)
**Propósito**: Gestión completa (ABM) de configuraciones del sistema

**Estructura**:
```
Container (flex column, height: 100%)
├── Header (flexShrink 0)
│   └── Título + Botón "Agregar"
├── Tabs Navigation (flexShrink 0)
│   └── 8 pestañas: Jerarquía, Objetivos, Riesgos, Tipo de Captura, 
│       Tipo de Impacto, Unidad de Medida, Usuarios, Tablero
├── Content Area (flex 1, overflow-y auto)
│   └── Tabla dinámica
└── Modal Form (cuando está visible)
    └── Formulario de agregar/editar
```

**Header Administración**:
- Título: "ABM de Jerarquía"
- Botón Agregar: backgroundColor #0B5DAA, color white, 36px altura
- flexbox horizontal space-between

**Tabs**:
- Estilo inline (no vertical)
- Activo: color #0B5DAA, borderBottom 3px solid #0B5DAA
- Inactivo: color #666, borderBottom 3px transparent
- Transición smooth al cambiar

**Tabla**:
- Header: backgroundColor rgba(11, 93, 170, 0.05)
- Filas: borderBottom 1px solid rgba(0,0,0,0.06)
- Hover: backgroundColor rgba(11, 93, 170, 0.02)
- Columnas dinámicas según tab activo
- Acciones (Edit/Delete): botones 36x36px con ícono, backgroundColor rgba(11, 93, 170, 0.1)

**Modal Form**:
- Título dinámico: "Agregar [Nombre Tab]"
- Inputs: Nombre (text), Descripción (textarea, minHeight 100px)
- Botones: Cancelar (gris), Guardar (azul #0B5DAA)
- Centrado en pantalla
- Overlay oscuro semi-transparente

---

### 4. **AppLayout** (`AppLayout.tsx`)
**Propósito**: Contenedor principal que envuelve todas las pantallas

**Estructura**:
```
Stack (verticalFill)
├── Header (sin scroll)
└── Stack.Item (grow, flex: 1, overflow-y auto)
    └── Contenido de página (Home/Administración/etc)
```

**Props**:
- `header` (ReactNode): componente Header
- `children` (ReactNode): contenido de la página

---

### 5. **ModalForm** (`ModalForm.tsx`)
**Propósito**: Componente reutilizable para formularios en modal

**Props**:
- `title` (string): título del modal
- `isOpen` (boolean): controla visibilidad
- `onClose` (function): callback al cerrar
- `onSubmit` (function): callback al guardar
- `children` (ReactNode): contenido del formulario

**Estilos**:
- Fondo overlay: rgba(0,0,0,0.5)
- Modal: fondo blanco, borderRadius 8px
- Ancho máximo: 500px
- Padding: 2rem

---

## Navegación y Rutas

**Rutas configuradas** en `Financiera.tsx`:
- `/` → Home
- `/galeria` → Galería de Instrumentos
- `/grafica` → Gráficas
- `/administracion` → Administración

---

## Estados y Comportamientos

### Home
- Carga datos del usuario desde props
- Al hacer clic en botón: navega a ruta correspondiente
- Hover effect en botones (elevación visual)

### Administración
- **Estado**: activeTab (string), showModal (boolean)
- **Carga de Datos**: usePortafolio hook (actualmente usa mock data)
- **Acciones**:
  - Click en tab → cambiar datos mostrados en tabla
  - Click en Agregar → abrir modal con formulario vacío
  - Click en Edit → (implementar) abrir modal con datos prellenados
  - Click en Delete → (implementar) confirmar y eliminar
  - Click Guardar → (implementar) enviar datos a SharePoint

---

## Elementos Reutilizables

### Ícones (Fluent UI Icons)
Usar clase `ms-Icon` con `ms-Icon--[IconName]`:
- `WaffleOffice365` - Ícono de bienvenida
- `NumberField` - Galería
- `AnalyticsReport` - Gráficas
- `Adjustments` - Administración
- `Edit` - Editar
- `Delete` - Eliminar
- `OrgChart` - Jerarquía (tabs)
- `Target` - Objetivos (tabs)
- `AlertSolid` - Riesgos (tabs)
- `Input` - Tipo de Captura (tabs)
- `PreviewLink` - Tipo de Impacto (tabs)
- `Ruler` - Unidad de Medida (tabs)
- `People` - Usuarios (tabs)
- `BarChart4` - Tablero (tabs)

---

## Breakpoints Responsivos

- **Desktop**: >= 1024px - Layout completo 2 columnas (Home)
- **Tablet**: 640px - 1024px - Ajustar tamaños
- **Mobile**: < 640px - Stack vertical, botones full-width

---

## Archivos Implementados

- `src/webparts/financiera/Financiera.tsx` - Componente raíz con rutas
- `src/webparts/financiera/components/Header/Header.tsx` - Barra superior
- `src/webparts/financiera/components/Home/Home.tsx` - Página de bienvenida
- `src/webparts/financiera/components/Administracion/Administracion.tsx` - Gestión ABM
- `src/webparts/financiera/components/shared/ui/AppLayout.tsx` - Contenedor
- `src/webparts/financiera/components/shared/ui/ModalForm.tsx` - Modal reutilizable
- `src/webparts/financiera/components/Home/Home.module.scss` - Estilos Home
- `src/webparts/financiera/components/Administracion/Administracion.module.scss` - Estilos Admin

---

## Próximas Mejoras

- [ ] Integrar datos reales desde SharePoint (usePortafolio hook)
- [ ] Implementar funcionalidad de Edit/Delete en Administración
- [ ] Añadir validación de formularios en ModalForm
- [ ] Crear componentes para Galería y Gráficas
- [ ] Implementar paginación en tabla de Administración
- [ ] Añadir filtros y búsqueda en tabla
- [ ] Internacionalización (ES/EN)
- [ ] Temas oscuro/claro (opcional)

---

## Notas Importantes

- **Styles**: Usar inline styles para componentes dinámicos, SCSS modules para componentes estáticos
- **Icons**: Fluent UI proporciona iconos con clase `ms-Icon--[IconName]`
- **Colores**: Definidos como constantes hex para consistencia
- **Accesibilidad**: Incluir `title` en botones de acciones, labels en inputs
- **Performance**: usePortafolio hook con memoización para evitar re-renders innecesarios
