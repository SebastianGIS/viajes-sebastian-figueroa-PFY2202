import React from 'react';
import { Link } from 'react-router-dom';

function DestinoCard({ destino }) {
  return (
    <article className="card-panel flex flex-col justify-between hover:shadow-lg transition duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-xl font-bold text-slate-900">{destino.nombre}</h2>
          <span className="text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
            {destino.pais}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-4">{destino.descripcion}</p>

        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Actividades populares
          </h3>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {destino.actividadesPopulares.map((actividad, index) => (
              <li key={index}>{actividad}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={`/destino/${destino.id}`}
        className="btn-primary w-full"
      >
        Ver vuelos y hoteles
      </Link>
    </article>
  );
}

export default DestinoCard;