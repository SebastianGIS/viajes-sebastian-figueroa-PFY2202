import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-100 transition">
            Horizonte Viajes
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-200 transition">
              Explorar Destinos
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-800 text-slate-300 text-sm py-4 text-center">
        <p>Horizonte Viajes - PFY2202</p>
      </footer>
    </div>
  );
}

export default Layout;