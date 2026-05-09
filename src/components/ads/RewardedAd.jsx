import React, { useState, useEffect } from 'react';
import { Play, X, ShieldCheck } from 'lucide-react';

const RewardedAd = ({ isOpen, onClose, onReward, title }) => {
  const [countdown, setCountdown] = useState(5);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isOpen && countdown === 0) {
      setIsFinished(true);
    }
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-primary-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Contenido Premium</h3>
              <p className="text-primary-100 text-sm">Mira un anuncio para desbloquear: {title}</p>
            </div>
          </div>
          {isFinished && (
            <button onClick={onClose} className="hover:bg-primary-700 p-2 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 mb-6 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <ins className="p5e0143515c"
                  style={{ width: '300px', height: '250px' }}
                  data-width="300"
                  data-height="250"
                  data-domain="//data527.click"
                  data-affquery="/bf8d1785e8103a9813c3/5e0143515c/?placementName=default">
                </ins>
             </div>
             <div className="z-10 bg-white/90 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
               <Play className="w-4 h-4 text-primary-600 fill-primary-600" />
               <span className="font-semibold text-slate-700">Anuncio Patrocinado</span>
             </div>
          </div>
          
          {!isFinished ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{countdown}s</div>
              <p className="text-slate-500">Desbloqueando análisis avanzado...</p>
            </div>
          ) : (
            <button 
              onClick={() => {
                onReward();
                onClose();
              }}
              className="btn-primary w-full py-4 text-lg"
            >
              Obtener Recompensa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardedAd;
