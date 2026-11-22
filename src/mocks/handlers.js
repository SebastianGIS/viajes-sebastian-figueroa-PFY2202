import { http, graphql, HttpResponse, delay } from 'msw';

const destinosData = [
  {
    id: 'paris',
    nombre: 'París',
    pais: 'Francia',
    descripcion: 'Capital europea reconocida por su arquitectura histórica, museos de clase mundial y gastronomía.',
    actividadesPopulares: [
      'Subir a la Torre Eiffel',
      'Recorrer el Museo del Louvre',
      'Paseo en barco por el río Sena'
    ]
  },
  {
    id: 'tokio',
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Metrópoli vibrante donde conviven templos milenarios con tecnología de vanguardia.',
    actividadesPopulares: [
      'Visitar el templo Senso-ji en Asakusa',
      'Cruzar la intersección de Shibuya',
      'Excursión panorámica al Monte Fuji'
    ]
  },
  {
    id: 'cusco',
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Antigua capital del Imperio Inca y puerta de entrada a los Andes peruanos.',
    actividadesPopulares: [
      'Tour guiado a Machu Picchu',
      'Recorrido por el Valle Sagrado',
      'Caminata a la Montaña de Siete Colores'
    ]
  },
  {
    id: 'roma',
    nombre: 'Roma',
    pais: 'Italia',
    descripcion: 'Ciudad eterna llena de ruinas del Imperio Romano, plazas barrocas y arte renacentista.',
    actividadesPopulares: [
      'Visitar el Coliseo Romano',
      'Lanzar una moneda en la Fontana di Trevi',
      'Recorrer los Museos Vaticanos'
    ]
  }
];

const opcionesPorDestino = {
  paris: {
    vuelos: [
      {
        id: 'V-101',
        aerolinea: 'Air France',
        origen: 'Santiago (SCL)',
        precio: 980,
        fecha: '2026-12-10',
        disponibilidad: 8
      },
      {
        id: 'V-102',
        aerolinea: 'LATAM Airlines',
        origen: 'Santiago (SCL)',
        precio: 1050,
        fecha: '2026-12-12',
        disponibilidad: 4
      }
    ],
    hoteles: [
      {
        id: 'H-201',
        nombre: 'Hotel Lumière Paris',
        estrellas: 4,
        precioPorNoche: 190,
        fechas: '10 Dic - 17 Dic 2026',
        disponibilidad: 5
      },
      {
        id: 'H-202',
        nombre: 'Le Marais Boutique',
        estrellas: 3,
        precioPorNoche: 135,
        fechas: '10 Dic - 17 Dic 2026',
        disponibilidad: 11
      }
    ]
  },
  tokio: {
    vuelos: [
      {
        id: 'V-301',
        aerolinea: 'ANA All Nippon Airways',
        origen: 'Santiago (SCL)',
        precio: 1420,
        fecha: '2027-01-15',
        disponibilidad: 6
      },
      {
        id: 'V-302',
        aerolinea: 'Japan Airlines',
        origen: 'Santiago (SCL)',
        precio: 1490,
        fecha: '2027-01-18',
        disponibilidad: 3
      }
    ],
    hoteles: [
      {
        id: 'H-401',
        nombre: 'Shinjuku Granbell Hotel',
        estrellas: 4,
        precioPorNoche: 175,
        fechas: '15 Ene - 22 Ene 2027',
        disponibilidad: 7
      },
      {
        id: 'H-402',
        nombre: 'Asakusa View Annex',
        estrellas: 3,
        precioPorNoche: 120,
        fechas: '15 Ene - 22 Ene 2027',
        disponibilidad: 9
      }
    ]
  },
  cusco: {
    vuelos: [
      {
        id: 'V-501',
        aerolinea: 'SKY Airline',
        origen: 'Santiago (SCL)',
        precio: 310,
        fecha: '2026-12-05',
        disponibilidad: 14
      },
      {
        id: 'V-502',
        aerolinea: 'LATAM Airlines',
        origen: 'Santiago (SCL)',
        precio: 365,
        fecha: '2026-12-06',
        disponibilidad: 5
      }
    ],
    hoteles: [
      {
        id: 'H-601',
        nombre: 'Palacio del Inka',
        estrellas: 5,
        precioPorNoche: 240,
        fechas: '05 Dic - 10 Dic 2026',
        disponibilidad: 2
      },
      {
        id: 'H-602',
        nombre: 'Tierra Viva Cusco Centro',
        estrellas: 3,
        precioPorNoche: 85,
        fechas: '05 Dic - 10 Dic 2026',
        disponibilidad: 10
      }
    ]
  },
  roma: {
    vuelos: [
      {
        id: 'V-701',
        aerolinea: 'ITA Airways',
        origen: 'Santiago (SCL)',
        precio: 940,
        fecha: '2027-02-02',
        disponibilidad: 9
      }
    ],
    hoteles: [
      {
        id: 'H-801',
        nombre: 'Hotel Artemide Roma',
        estrellas: 4,
        precioPorNoche: 210,
        fechas: '02 Feb - 09 Feb 2027',
        disponibilidad: 4
      }
    ]
  }
};

export const handlers = [
  // 1. Endpoint REST para listar los destinos disponibles
  http.get('/api/destinos', async () => {
    await delay(500);
    return HttpResponse.json(destinosData);
  }),

  // 2. Consulta GraphQL para obtener vuelos y hoteles de un destino especifico
  graphql.query('GetOpcionesViaje', async ({ variables }) => {
    const { destinoId } = variables;
    await delay(600);

    const destino = destinosData.find((d) => d.id === destinoId);
    const opciones = opcionesPorDestino[destinoId];

    if (!destino || !opciones) {
      return HttpResponse.json({
        errors: [
          {
            message: `No se encontraron vuelos ni hoteles para el destino "${destinoId}".`
          }
        ]
      });
    }

    return HttpResponse.json({
      data: {
        destinoDetalle: {
          id: destino.id,
          nombre: destino.nombre,
          pais: destino.pais,
          vuelos: opciones.vuelos,
          hoteles: opciones.hoteles
        }
      }
    });
  })
];