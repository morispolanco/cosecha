import React from 'react';
import Header from './Header';
import TopBanner from '../ads/TopBanner';
import BottomBanner from '../ads/BottomBanner';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <TopBanner />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <BottomBanner />
      
      <footer className="bg-primary-950 text-slate-300 py-12 px-4 border-t border-primary-900">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">AgroInteligencia GT</h3>
            <p className="text-sm leading-relaxed mb-6">
              Empoderando a los agricultores guatemaltecos con tecnología de punta e inteligencia artificial para un campo más productivo y sostenible.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <div className="w-8 h-8 bg-primary-800 rounded-full"></div>
               <div className="w-8 h-8 bg-primary-800 rounded-full"></div>
               <div className="w-8 h-8 bg-primary-800 rounded-full"></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Fuentes de Datos</h4>
            <ul className="text-sm space-y-2">
              <li>Ministerio de Agricultura (MAGA)</li>
              <li>INSIVUMEH</li>
              <li>CIEA / Boletines Agroclimáticos</li>
              <li>APIs Climáticas Globales</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="text-sm space-y-2">
              <li>Términos de Servicio</li>
              <li>Política de Privacidad</li>
              <li>Uso de Datos Geográficos</li>
              <li>Contacto de Soporte</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-primary-900 text-center text-xs text-primary-400">
          © {new Date().getFullYear()} AgroInteligencia GT. Todos los derechos reservados. Desarrollado para el desarrollo agrícola de Guatemala.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
