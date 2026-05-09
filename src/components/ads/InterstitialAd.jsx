import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const InterstitialAd = ({ isOpen, onClose }) => {
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setCanClose(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setCanClose(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {canClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
           <div className="text-center mb-8">
             <h2 className="text-2xl font-bold text-slate-800">Publicidad</h2>
             <p className="text-slate-500">Gracias por usar AgroInteligencia GT</p>
           </div>
           
           <div className="w-full max-w-[728px] h-[90px] bg-white shadow-sm rounded-lg flex items-center justify-center border border-slate-200">
              <ins className="p5e0143515c"
                  style={{ width: '728px', height: '90px' }}
                  data-width="728"
                  data-height="90"
                  data-domain="//data527.click"
                  data-affquery="/bf8d1785e8103a9813c3/5e0143515c/?placementName=default">
              </ins>
           </div>

           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                <h4 className="font-semibold mb-2">Análisis de Datos</h4>
                <p className="text-xs text-slate-500">Procesando información climática regional</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                <h4 className="font-semibold mb-2">IA Generativa</h4>
                <p className="text-xs text-slate-500">Generando recomendaciones personalizadas</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                <h4 className="font-semibold mb-2">Reporte Final</h4>
                <p className="text-xs text-slate-500">Preparando su documento descargable</p>
              </div>
           </div>

           {!canClose && (
             <div className="mt-8 flex items-center gap-2">
               <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               <span className="text-sm text-slate-500 ml-2">Espere un momento...</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default InterstitialAd;
