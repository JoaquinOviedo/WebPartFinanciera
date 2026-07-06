# Guía rápida del proyecto

Este archivo sirve como mapa rápido para entender cómo está pensado el proyecto y dónde hacer cambios sin tener que leer todo el repositorio.

## 1. Qué es este proyecto

Es un Web Part de SharePoint Framework (SPFx) desarrollado con React. La idea general es mostrar una experiencia de finanzas en una interfaz tipo aplicación, con navegación por rutas, componentes reutilizables y acceso a SharePoint a través de servicios centralizados.

## 2. Estructura principal del proyecto

- [src/webparts/financiera](src/webparts/financiera): punto de entrada visual del web part.
  - [src/webparts/financiera/FinancieraWebPart.ts](src/webparts/financiera/FinancieraWebPart.ts): inicializa el web part en SharePoint/SPFx.
  - [src/webparts/financiera/Financiera.tsx](src/webparts/financiera/Financiera.tsx): shell principal de la app, rutas y layout general.
  - [src/webparts/financiera/components](src/webparts/financiera/components): pantallas y componentes de UI.

- [src/core](src/core): lógica compartida y servicios de negocio.
  - [src/core/services](src/core/services): conexiones y servicios para SharePoint.
  - [src/core/hooks](src/core/hooks): hooks reutilizables para acceder a datos o servicios.
  - [src/core/entities](src/core/entities): modelos o entidades del dominio.
  - [src/core/utils](src/core/utils): utilidades generales.

- [src/index.ts](src/index.ts): punto de entrada base del proyecto.

- [package.json](package.json): dependencias, scripts y configuración del proyecto.

## 3. Cómo está pensado el flujo de la app

1. El web part se inicia desde [src/webparts/financiera/FinancieraWebPart.ts](src/webparts/financiera/FinancieraWebPart.ts).
2. Ese archivo crea el componente principal [src/webparts/financiera/Financiera.tsx](src/webparts/financiera/Financiera.tsx).
3. En el componente principal se define:
   - el layout general,
   - el menú,
   - las rutas de navegación,
   - la página inicial y las pantallas secundarias.
4. Las pantallas viven en [src/webparts/financiera/components](src/webparts/financiera/components).
5. Si una pantalla necesita datos de SharePoint, debería usar servicios o hooks del área [src/core](src/core), no consultar SharePoint directamente desde la UI.

## 4. Dónde hacer cambios según el tipo de tarea

### Si quieres cambiar la navegación o el layout
- Revisar [src/webparts/financiera/Financiera.tsx](src/webparts/financiera/Financiera.tsx).
- Revisar [src/webparts/financiera/components/NavMenu/NavMenu](src/webparts/financiera/components/NavMenu).
- Revisar [src/webparts/financiera/components/Header/Header](src/webparts/financiera/components/Header).

### Si quieres agregar una nueva pantalla
- Crear el componente en [src/webparts/financiera/components](src/webparts/financiera/components).
- Agregar la ruta en [src/webparts/financiera/Financiera.tsx](src/webparts/financiera/Financiera.tsx).
- Si corresponde, agregar el enlace en el menú.

### Si quieres cambiar la lógica de acceso a SharePoint
- Revisar [src/core/services](src/core/services).
- Empezar por [src/core/services/SharePointConnection.ts](src/core/services/SharePointConnection.ts) y [src/core/hooks/useSharePointConnection.ts](src/core/hooks/useSharePointConnection.ts).

### Si quieres cambiar estilos
- Revisar el archivo SCSS del componente respectivo en [src/webparts/financiera/components](src/webparts/financiera/components).
- El patrón usado es SCSS module, por ejemplo [src/webparts/financiera/Financiera.module.scss](src/webparts/financiera/Financiera.module.scss).

### Si quieres cambiar propiedades del web part
- Revisar [src/webparts/financiera/FinancieraWebPart.ts](src/webparts/financiera/FinancieraWebPart.ts).

## 5. Convenciones útiles

- Mantener la UI en la carpeta de componentes y la lógica compartida en [src/core](src/core).
- Evitar que los componentes directamente hagan llamadas a SharePoint si ya existe un servicio o hook para eso.
- Si un cambio afecta la estructura general, la navegación o la integración con SharePoint, actualizar este archivo.
- Preferir cambios pequeños y localizados antes que modificar múltiples capas a la vez.

## 6. Mapa rápido de pantallas y módulos

- [src/webparts/financiera/components/Home](src/webparts/financiera/components/Home): pantalla inicial y bienvenida.
- [src/webparts/financiera/components/GaleriaInstrumentos](src/webparts/financiera/components/GaleriaInstrumentos): vista de instrumentos o contenido visual.
- [src/webparts/financiera/components/Grafica](src/webparts/financiera/components/Grafica): pantallas con visualización o gráficos.
- [src/webparts/financiera/components/Administracion](src/webparts/financiera/components/Administracion): lógica de administración o gestión de datos.
- [src/webparts/financiera/components/NavMenu](src/webparts/financiera/components/NavMenu): menú de navegación del web part.
- [src/webparts/financiera/components/Header](src/webparts/financiera/components/Header): cabecera superior.
- [src/webparts/financiera/components/shared](src/webparts/financiera/components/shared): tipos y contratos compartidos entre componentes.

## 7. Flujo de datos típico

1. El usuario interactúa con una pantalla en [src/webparts/financiera/components](src/webparts/financiera/components).
2. La pantalla puede invocar un servicio o hook de [src/core](src/core).
3. El servicio de SharePoint o la conexión centralizada consulta los datos.
4. La respuesta vuelve al componente y se renderiza en la UI.

En otras palabras: la UI no debería manejar directamente la conexión a SharePoint; debería delegar en [src/core/services](src/core/services) o [src/core/hooks](src/core/hooks).

## 8. Checklist para cambios importantes

Antes de modificar algo sensitivo, revisar:
- si el cambio afecta rutas en [src/webparts/financiera/Financiera.tsx](src/webparts/financiera/Financiera.tsx);
- si cambia la forma de obtener datos en [src/core/services](src/core/services);
- si requiere ajustar estilos en el componente correspondiente;
- si el cambio debe documentarse aquí para que otros desarrolladores lo entiendan rápido.

## 9. Regla de mantenimiento

Siempre que se haga un cambio importante, actualizar esta guía con:
- qué cambió,
- dónde está ahora la lógica,
- qué archivos clave fueron tocados,
- si cambió la navegación, la arquitectura o la forma de consumir datos.

## 10. Punto de partida recomendado para un cambio

Si no sabes por dónde empezar, este es el orden recomendado:
1. Leer esta guía.
2. Revisar [src/webparts/financiera/Financiera.tsx](src/webparts/financiera/Financiera.tsx).
3. Identificar si el cambio es de UI, navegación, datos o configuración.
4. Buscar el archivo más cercano al área afectada.
5. Modificar de forma localizada y luego actualizar esta guía si el cambio fue significativo.
