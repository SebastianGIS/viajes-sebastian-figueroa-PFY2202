import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import VueloCard from '../components/VueloCard';
import HotelCard from '../components/HotelCard';

const GET_OPCIONES_VIAJE = gql`
  query GetOpcionesViaje($destinoId: ID!) {
    destinoDetalle(destinoId: $destinoId) {
      id
      nombre
      pais
      vuelos {
        id
        aerolinea
        origen
        precio
        fecha
        disponibilidad
      }
      hoteles {
        id
        nombre
        estrellas
        precioPorNoche
        fechas
        disponibilidad
      }
    }
  }
`;

function DestinoDetalle() {
  const { id } = useParams();
  const [vueloElegido, setVueloElegido] = useState(null);
  const [hotelElegido, setHotelElegido] = useState(null);

  const { loading, error, data } = useQuery(GET_OPCIONES_VIAJE, {
    variables: { destinoId: id }
  });

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">
          Consultando vuelos y hoteles disponibles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto my-12 bg-red-50 border border-red-300 text-red-700 p-6 rounded-xl text-center">
        <h2 className="text-lg font-bold mb-2">No se pudo cargar el destino</h2>
        <p className="text-sm mb-4">{error.message}</p>
        <Link to="/" className="btn-primary">
          Volver a Destinos
        </Link>
      </div>
    );
  }

  const { destinoDetalle } = data;

  const toggleVuelo = (vuelo) => {
    setVueloElegido((prev) => (prev && prev.id === vuelo.id ? null : vuelo));
  };

  const toggleHotel = (hotel) => {
    setHotelElegido((prev) => (prev && prev.id === hotel.id ? null : hotel));
  };

  const totalEstimado =
    (vueloElegido ? vueloElegido.precio : 0) +
    (hotelElegido ? hotelElegido.precioPorNoche : 0);

  return (
    <section>
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          &larr; Volver al listado de destinos
        </Link>
      </div>

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {destinoDetalle.pais}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
          Planifica tu viaje a {destinoDetalle.nombre}
        </h1>
        <p className="text-slate-600 mt-1">
          Selecciona una opcion de vuelo y alojamiento para armar tu itinerario.
        </p>
      </div>

      {(vueloElegido || hotelElegido) && (
        <div className="mb-8 bg-blue-900 text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Resumen de tu seleccion</h2>
            <p className="text-sm text-blue-100 mt-1">
              Vuelo:{' '}
              <span className="font-semibold text-white">
                {vueloElegido ? `${vueloElegido.aerolinea} ($${vueloElegido.precio} USD)` : 'Pendiente'}
              </span>{' '}
              | Hotel:{' '}
              <span className="font-semibold text-white">
                {hotelElegido
                  ? `${hotelElegido.nombre} ($${hotelElegido.precioPorNoche} USD / noche)`
                  : 'Pendiente'}
              </span>
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="block text-xs uppercase tracking-wider text-blue-200">
              Total inicial (vuelo + 1 noche)
            </span>
            <span className="text-2xl font-extrabold">${totalEstimado} USD</span>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Vuelos disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinoDetalle.vuelos.map((vuelo) => (
            <VueloCard
              key={vuelo.id}
              vuelo={vuelo}
              seleccionado={vueloElegido?.id === vuelo.id}
              onSeleccionar={toggleVuelo}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Hoteles disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinoDetalle.hoteles.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              seleccionado={hotelElegido?.id === hotel.id}
              onSeleccionar={toggleHotel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DestinoDetalle;