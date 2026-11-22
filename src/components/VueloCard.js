import React from 'react';

function VueloCard({ vuelo, seleccionado, onSeleccionar }) {
  return (
    <div
      className={`card-panel border-2 transition duration-200 flex flex-col justify-between ${
        seleccionado
          ? 'border-blue-600 bg-blue-50/40'
          : 'border-slate-100 hover:border-slate-300'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Codigo: {vuelo.id}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              vuelo.disponibilidad > 3
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {vuelo.disponibilidad} asientos disponibles
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{vuelo.aerolinea}</h3>
        <p className="text-sm text-slate-600 mb-1">
          <span className="font-medium text-slate-700">Origen:</span> {vuelo.origen}
        </p>
        <p className="text-sm text-slate-600 mb-4">
          <span className="font-medium text-slate-700">Fecha de salida:</span> {vuelo.fecha}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
        <div>
          <span className="block text-xs text-slate-500">Tarifa por persona</span>
          <span className="text-xl font-extrabold text-blue-700">
            ${vuelo.precio} USD
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSeleccionar(vuelo)}
          className={seleccionado ? 'btn-secondary' : 'btn-primary'}
        >
          {seleccionado ? 'Vuelo seleccionado' : 'Seleccionar vuelo'}
        </button>
      </div>
    </div>
  );
}

export default VueloCard;