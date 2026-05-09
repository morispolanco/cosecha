import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/ui/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<HomePage />} />
        <Route path="/reports" element={<HomePage />} />
        <Route path="/about" element={<div className="card max-w-2xl mx-auto"><h2 className="text-2xl font-bold mb-4">Sobre AgroInteligencia GT</h2><p>Esta plataforma utiliza modelos avanzados de inteligencia artificial y datos climáticos regionales para apoyar a los agricultores de Guatemala en la toma de decisiones informadas.</p></div>} />
      </Routes>
    </Layout>
  );
}

export default App;
