# Horizonte Viajes

Aplicacion web desarrollada en React - **Desarrollo Frontend II (PFY2202)**

La plataforma permite explorar destinos turisticos y planificar itinerarios combinando vuelos y hoteles mediante la integracion simultanea de una API REST Mock y una API GraphQL Mock.

Enlace en vivo (GitHub Pages): https://sebastiangis.github.io/viajes-sebastian-figueroa-PFY2202/

## Caracteristicas principales

* **Consumo de API REST Mock:** Listado general de destinos (pais, descripcion y actividades populares) obtenido mediante `fetch` desde `/api/destinos` con filtrado dinamico por pais.
* **Consumo de API GraphQL Mock:** Consulta de vuelos y hoteles disponibles por destino (aerolineas, tarifas, fechas y disponibilidad) utilizando **Apollo Client** (`gql` y `useQuery`).
* **Simulacion de Backend con MSW:** Interceptacion de solicitudes HTTP y GraphQL directamente en el navegador mediante **Mock Service Worker (MSW v2)** con tiempos de respuesta simulados y manejo de errores.
* **Enrutamiento SPA:** Navegacion sin recargas de pagina con **React Router DOM**, rutas dinamicas (`/destino/:id`) y ruta comodin 404.
* **Planificacion de Itinerario:** Seleccion interactiva de vuelo y hotel con calculo automatico del total estimado.
* **Diseno Responsivo:** Interfaz adaptable a dispositivos moviles y escritorio construida con **Tailwind CSS**.

## Tecnologias del proyecto

* React 18 (Componentes Funcionales y Hooks: `useState`, `useEffect`)
* React Router DOM
* Apollo Client & GraphQL
* Mock Service Worker (MSW v2)
* Tailwind CSS v3

## Estructura del proyecto

```text
public/
 └── mockServiceWorker.js    # Service Worker generado por MSW para interceptar peticiones
src/
 ├── components/
 │    ├── DestinoCard.js     # Tarjeta reutilizable para cada destino (datos REST)
 │    ├── HotelCard.js       # Tarjeta reutilizable para opciones de alojamiento (datos GraphQL)
 │    ├── Layout.js          # Estructura maestra con barra de navegacion y pie de pagina
 │    └── VueloCard.js       # Tarjeta reutilizable para opciones de vuelo (datos GraphQL)
 ├── mocks/
 │    ├── browser.js         # Configuracion del Service Worker en el navegador
 │    └── handlers.js        # Definicion de endpoints REST (/api/destinos) y consultas GraphQL
 ├── pages/
 │    ├── Destinos.js        # Vista principal con listado de destinos y filtro por pais
 │    └── DestinoDetalle.js  # Vista de detalle con vuelos, hoteles y resumen de seleccion
 ├── App.js                  # Configuracion de rutas con BrowserRouter
 ├── index.css               # Directivas de Tailwind CSS y clases componentes (@apply)
 └── index.js                # Inicializacion de MSW y proveedor global ApolloProvider
```

## Instalacion y Ejecucion Local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/SebastianGIS/viajes-sebastian-figueroa-PFY2202.git](https://github.com/SebastianGIS/viajes-sebastian-figueroa-PFY2202.git)
   ```
2. Ingresar al directorio del proyecto:
   ```bash
   cd viajes-sebastian-figueroa-PFY2202
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
5. Abrir `http://localhost:3000` en el navegador.
