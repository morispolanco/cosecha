import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const GuatemalaMap = ({ onPositionChange }) => {
  const [position, setPosition] = useState({ lat: 14.6349, lng: -90.5069 }); // Guatemala City default

  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(position);
    }
  }, [position]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-inner border-4 border-white">
      <MapContainer 
        center={[14.6349, -90.5069]} 
        zoom={7} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 z-[400] glass p-3 rounded-lg shadow-lg border border-white/50">
        <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Coordenadas Seleccionadas</p>
        <div className="flex gap-4 text-xs font-mono text-primary-900">
          <div><span className="text-slate-400">LAT:</span> {position.lat.toFixed(6)}</div>
          <div><span className="text-slate-400">LNG:</span> {position.lng.toFixed(6)}</div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 z-[400] pointer-events-none">
         <div className="bg-primary-600/90 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Mapa de Guatemala Interactivo
         </div>
      </div>
    </div>
  );
};

export default GuatemalaMap;
