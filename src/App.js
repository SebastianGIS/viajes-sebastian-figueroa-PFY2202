import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Destinos from './pages/Destinos';
import DestinoDetalle from './pages/DestinoDetalle';

function PaginaNoEncontrada() {
  return (
    <div className="max-w-md mx-auto text-center py-16 card-panel">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
      <p className="text-slate-600 mb-6">
        La ruta que intentas visitar no existe
      </p>
      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Destinos />} />
          <Route path="/destino/:id" element={<DestinoDetalle />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;