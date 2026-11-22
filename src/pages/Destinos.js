import React, { useState, useEffect } from 'react';
import DestinoCard from '../components/DestinoCard';

function Destinos() {
  const [destinos, setDestinos] = useState([]);
  const [paisFiltro, setPaisFiltro] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('/api/destinos')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}: No se pudieron cargar los destinos.`);
        }
        return response.json();
      })
      .then((data) => {
        setDestinos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const paisesDisponibles = ['Todos', ...new Set(destinos.map((d) => d.pais))];

  const destinosFiltrados =
    paisFiltro === 'Todos'
      ? destinos
      : destinos.filter((d) => d.pais === paisFiltro);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Cargando destinos disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto my-12 bg-red-50 border border-red-300 text-red-700 p-6 rounded-xl text-center">
        <h2 className="text-lg font-bold mb-2">Error al conectar con el servidor</h2>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Destinos Disponibles
          </h1>
          <p className="text-slate-600 mt-1">
            Selecciona un destino para explorar vuelos y hoteles disponibles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filtro-pais" className="text-sm font-medium text-slate-700">
            Filtrar por pais:
          </label>
          <select
            id="filtro-pais"
            value={paisFiltro}
            onChange={(e) => setPaisFiltro(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {paisesDisponibles.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {destinosFiltrados.map((destino) => (
          <DestinoCard key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  );
}

export default Destinos;