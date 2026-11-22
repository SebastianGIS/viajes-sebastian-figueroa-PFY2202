import React from 'react';

function HotelCard({ hotel, seleccionado, onSeleccionar }) {
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
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
            Categoria: {hotel.estrellas} estrellas
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              hotel.disponibilidad > 3
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {hotel.disponibilidad} habitaciones disponibles
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{hotel.nombre}</h3>
        <p className="text-sm text-slate-600 mb-4">
          <span className="font-medium text-slate-700">Fechas sugeridas:</span> {hotel.fechas}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
        <div>
          <span className="block text-xs text-slate-500">Valor por noche</span>
          <span className="text-xl font-extrabold text-blue-700">
            ${hotel.precioPorNoche} USD
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSeleccionar(hotel)}
          className={seleccionado ? 'btn-secondary' : 'btn-primary'}
        >
          {seleccionado ? 'Hotel seleccionado' : 'Seleccionar hotel'}
        </button>
      </div>
    </div>
  );
}

export default HotelCard;