import React from 'react';
import { Leaf, Map as MapIcon, BarChart3, FileText, Info, RefreshCw } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Mapa', path: '/', icon: MapIcon },
    { name: 'Análisis', path: '/analysis', icon: BarChart3 },
    { name: 'Reportes', path: '/reports', icon: FileText },
    { name: 'Info', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-[500] w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary-600 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-900 leading-none">AgroInteligencia GT</h1>
            <p className="text-[10px] text-primary-600 font-medium tracking-wider uppercase">Agricultura de Precisión</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden lg:block text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            v1.0.4 - BETA
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Nueva Consulta
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
