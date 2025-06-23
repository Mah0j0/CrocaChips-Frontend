# TailAdmin React

Panel de administración moderno construido con **React 19**, **Vite**, **Tailwind CSS** y una variedad de librerías especializadas para gráficos, formularios, calendarios y más.

## 🚀 Características principales

- Interfaz moderna y responsiva con Tailwind CSS.
- Manejo de formularios con `react-hook-form`.
- Peticiones HTTP con `axios` y manejo de datos con `react-query`.
- Gráficas dinámicas con ApexCharts.
- Calendarios interactivos con FullCalendar.
- Soporte para drag and drop, subida de archivos y notificaciones.
- Enrutamiento con `react-router`.
- Arquitectura modular y optimizada para producción con Vite.

## 📦 Tecnologías y librerías usadas

### Dependencias principales

| Librería                        | Propósito                                      |
|--------------------------------|------------------------------------------------|
| `react` / `react-dom`          | Librería principal para UI                     |
| `react-router`                 | Enrutamiento SPA                               |
| `axios`                        | Cliente HTTP                                   |
| `@tanstack/react-query`        | Manejo de peticiones y caché de datos          |
| `react-hook-form`             | Formularios con validación                     |
| `react-toastify`               | Notificaciones                                 |
| `flatpickr`                    | Selector de fechas                             |
| `@fullcalendar/*`             | Calendario interactivo                         |
| `apexcharts` / `react-apexcharts` | Gráficos y visualización de datos         |
| `@react-jvectormap/*`         | Mapas interactivos                             |
| `react-dnd` / `react-dnd-html5-backend` | Drag & drop                         |
| `react-dropzone`              | Subida de archivos                             |
| `react-helmet-async`          | Manipulación del head (SEO, meta tags, etc.)   |
| `swiper`                      | Carruseles y sliders                           |
| `clsx`                        | Utilidad para clases condicionales             |
| `tailwind-merge`              | Combinar clases Tailwind sin conflictos        |

### Herramientas de desarrollo

| Herramienta                    | Uso                                             |
|-------------------------------|--------------------------------------------------|
| `vite`                        | Bundler ultrarrápido                            |
| `typescript`                  | Tipado estático                                 |
| `eslint`                      | Linter de código                                |
| `tailwindcss`                 | Estilos utilitarios                             |
| `vite-plugin-svgr`           | Importar SVG como componentes React             |

## 📂 Estructura del proyecto (resumida)

```
src/
│
├── components/         # Componentes reutilizables
├── pages/              # Páginas del sistema
├── services/           # Peticiones HTTP (axios)
├── hooks/              # Hooks personalizados
├── assets/             # Imágenes, íconos, etc.
└── App.tsx             # Componente principal
```

## ⚙️ Scripts disponibles

| Comando           | Descripción                                     |
|------------------|-------------------------------------------------|
| `npm run dev`     | Levanta el servidor de desarrollo (Vite)       |
| `npm run build`   | Compila la app para producción                  |
| `npm run preview` | Previsualiza el build de producción             |
| `npm run lint`    | Ejecuta ESLint sobre el código                  |

## 🚀 Primeros pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Mah0j0/CrocaChips-Frontend.git
   cd CrocaChips-Frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en `.env.example` y configura tu API:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

📊 DASHBOARDS RECOMENDADOS
🔹 1. Dashboard de Ventas
KPIs:
✅ Total de ventas del mes / semana

📈 Tendencia de ventas por fecha

🧍‍♂️ Ventas por vendedor

🛍️ Productos más vendidos (por cantidad y por monto)

🧾 Ticket promedio = Total ventas / número de ventas

🧑‍🤝‍🧑 Clientes frecuentes (mayor cantidad de compras)

Gráficos sugeridos:
Línea temporal de ventas (por día/semana/mes)

Barras horizontales: Top 10 productos

Pie chart: Participación por vendedor

🔹 2. Dashboard de Inventario
KPIs:
📦 Stock actual por producto

🆕 Productos recién producidos (últimos lotes)

⚠️ Productos con bajo stock

♻️ Días promedio para agotar stock

📤 Movimientos de salida (ventas)

📥 Movimientos de entrada (producción)

Gráficos sugeridos:
Barras apiladas: Movimientos (entradas/salidas) por producto

Tabla: Productos con menor stock

Línea de tiempo: Evolución del inventario por producto

🔹 3. Dashboard de Producción
KPIs:
🏭 Total producido en el mes

🕒 Tiempo promedio entre producciones

📅 Productos producidos por fecha

🚨 Diferencia entre producción y ventas (¿sobrestock o falta?)

Gráficos sugeridos:
Línea temporal: Cantidad producida por día

Tabla: Comparativa entre producción y ventas por producto

🔹 4. Dashboard de Clientes
KPIs:
👥 Total de clientes activos

📈 Nuevos clientes por mes

💸 Clientes con mayor volumen de compra

⏱️ Tiempo promedio entre compras

Gráficos sugeridos:
Tabla: Clientes con más compras

Gráfico de barras: Nuevos clientes por mes
