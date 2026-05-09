import React, { useState } from 'react';
import GuatemalaMap from '../components/map/GuatemalaMap';
import { getClimateAnalysis, generateAgriculturalReport } from '../services/aiService';
import { Thermometer, Droplets, Mountain, CloudRain, ShieldAlert, Loader2, Sprout, ArrowRight } from 'lucide-react';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import InterstitialAd from '../components/ads/InterstitialAd';

const HomePage = () => {
  const [coords, setCoords] = useState({ lat: 14.6349, lng: -90.5069 });
  const [loading, setLoading] = useState(false);
  const [climateData, setClimateData] = useState(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  
  // Ad states
  const [showInterstitial, setShowInterstitial] = useState(false);

  const handleFullAnalysis = async () => {
    setLoading(true);
    setClimateData(null);
    setReport(null);
    setError(null);
    
    try {
      // 1. Get Climate Data
      const climate = await getClimateAnalysis(coords);
      setClimateData(climate);

      // 2. Generate AI Report Immediately
      const fullReport = await generateAgriculturalReport({
        location: coords,
        climate: {
          temp: climate.temp,
          humidity: climate.humidity,
          precipitation: climate.precipitation
        },
        altitude: climate.altitude,
        terrainData: {
          soilType: climate.soilType,
          risks: climate.risks
        }
      });
      
      setReport(fullReport);
      setShowInterstitial(true);

      // Auto-scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message}. Por favor, verifica tu configuración de API en Vercel o intenta de nuevo.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Error Alert */}
      {error && (
        <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          La Inteligencia Artificial que hace florecer el <span className="text-primary-600">Campo Guatemalteco</span>
        </h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Ubica tu terreno en el mapa y recibe un análisis agroclimático completo basado en datos reales del 
          <span className="font-bold text-slate-800"> MAGA e INSIVUMEH</span>.
        </p>
      </section>

      {/* Map and Initial Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 card !p-0 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-primary-600" />
              Selecciona tu terreno
            </h3>
            <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-bold uppercase">Interactiva</span>
          </div>
          <GuatemalaMap onPositionChange={setCoords} />
          <div className="p-6 bg-white">
            <button 
              onClick={handleFullAnalysis}
              disabled={loading}
              className="btn-primary w-full py-4 text-lg"
            >
              {loading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Generando Análisis Inteligente...</>
              ) : (
                <>Realizar Análisis Completo con IA <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {climateData ? (
            <div className="animate-in slide-in-from-right duration-500">
              <div className="card border-l-4 border-l-primary-500 mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                  Condiciones Detectadas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <ClimateStat icon={Mountain} label="Altitud" value={`${climateData.altitude} msnm`} />
                  <ClimateStat icon={Thermometer} label="Temperatura" value={`${climateData.temp}°C`} />
                  <ClimateStat icon={Droplets} label="Humedad" value={`${climateData.humidity}%`} />
                  <ClimateStat icon={CloudRain} label="Precipitación" value={`${climateData.precipitation} mm`} />
                </div>
              </div>

              <div className="card bg-earth-600 text-white border-none">
                 <h4 className="font-bold mb-2">Análisis de Suelo Estimado</h4>
                 <p className="text-earth-50 text-sm mb-4">Región: {climateData.region}</p>
                 <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-xs font-bold uppercase opacity-70">Tipo de Suelo</p>
                    <p className="font-semibold">{climateData.soilType}</p>
                 </div>
              </div>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center p-12 border-dashed border-2 border-slate-200 bg-slate-50">
               <div className="bg-slate-200 p-6 rounded-full mb-6">
                 <MapIcon className="w-12 h-12 text-slate-400" />
               </div>
               <h3 className="font-bold text-slate-800 mb-2">Esperando Ubicación</h3>
               <p className="text-slate-500 text-sm">
                 Haz clic en cualquier punto del mapa para generar un análisis completo de productividad.
               </p>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {report && (
        <section id="results" className="animate-in fade-in slide-in-from-bottom duration-700">
           <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                 <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Resultados de Productividad</h2>
                    <p className="text-slate-500">Informe generado por AgroInteligencia GT v1.0</p>
                 </div>
                 <button className="btn-secondary">
                   <FileText className="w-5 h-5" /> Descargar Reporte PDF
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <RecommendationCard title="Cultivos Recomendados" items={report.recommended_crops} icon={Sprout} color="primary" />
                 <RecommendationCard title="Riesgos Climáticos" items={report.climate_risks} icon={ShieldAlert} color="red" />
              </div>

              <div className="card">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                   <Info className="w-6 h-6 text-primary-600" />
                   Análisis de Terreno
                 </h3>
                 <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">
                   {report.analysis}
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="card">
                    <h4 className="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                       <CloudRain className="w-4 h-4 text-primary-600" />
                       Calendario de Siembra
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{report?.planting_calendar || "No disponible"}</p>
                 </div>
                 <div className="card">
                    <h4 className="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                       <Sprout className="w-4 h-4 text-primary-600" />
                       Nutrientes Necesarios
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{report?.soil_nutrients || "No disponible"}</p>
                 </div>
                 <div className="card">
                    <h4 className="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                       <Droplets className="w-4 h-4 text-primary-600" />
                       Manejo de Riego
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{report?.irrigation_management || "No disponible"}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="card border-l-4 border-l-amber-500">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <ShieldAlert className="w-5 h-5 text-amber-500" />
                       Control de Plagas y Pesticidas
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                       {report?.pest_and_disease || "Información en proceso..."}
                    </p>
                 </div>
                 <div className="card border-l-4 border-l-primary-500">
                    <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                       <BarChart3 className="w-5 h-5 text-primary-500" />
                       Estrategia de Fertilización
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-primary-50/50 p-4 rounded-lg border border-primary-100">
                       {report?.fertilization_strategy || "Información en proceso..."}
                    </p>
                 </div>
              </div>

              <div className="card">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                   <Info className="w-6 h-6 text-primary-600" />
                   Consejos de Manejo y Productividad
                 </h3>
                 <div className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm">
                   {report?.management_tips || "Optimización de terreno en curso..."}
                 </div>
              </div>

              <div className="card bg-slate-900 text-white border-none p-10 text-center shadow-xl">
                 <h3 className="text-2xl font-bold mb-4">Resumen para el Productor</h3>
                 <p className="text-slate-300 italic text-lg leading-relaxed">
                   "{report?.summary || "Generando recomendaciones finales..."}"
                 </p>
              </div>
           </div>
        </section>
      )}

      <InterstitialAd 
        isOpen={showInterstitial} 
        onClose={() => setShowInterstitial(false)} 
      />
    </div>
  );
};

const ClimateStat = ({ icon: Icon, label, value }) => (
  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-primary-200 transition-colors">
    <div className="flex items-center gap-2 text-slate-500 mb-1">
      <Icon className="w-4 h-4" />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-lg font-bold text-slate-800">{value}</div>
  </div>
);

const MapIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
);

const BarChart3 = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
);

export default HomePage;
