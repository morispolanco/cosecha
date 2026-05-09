export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lng } = req.body;

  // Simulación de datos agroclimáticos basados en la geografía de Guatemala
  // Guatemala: lat 13.8 to 18.5, lng -92.3 to -88.2
  
  // Altitud aproximada (Lógica simple: más alto hacia el centro/occidente)
  const altitude = Math.abs(lng + 90) * 1500 + Math.abs(lat - 15) * 500;
  const clampedAltitude = Math.max(0, Math.min(4200, altitude));

  // Temperatura (Lógica: baja 0.6 grados cada 100m)
  const baseTemp = 28; // Costa
  const temp = baseTemp - (clampedAltitude / 100) * 0.6;
  
  // Precipitación (Lógica: mayor en Izabal/Verapaces, menor en el oriente)
  let precipitation = 1200;
  if (lng > -89.5) precipitation += 800; // Izabal / Caribe
  if (lat > 15.5 && lat < 16.5) precipitation += 1000; // Verapaces
  if (lng < -91.5) precipitation -= 400; // Altiplano seco (partes)

  // Humedad
  const humidity = 60 + (precipitation / 3000) * 30;

  // Zona Agrícola
  let region = "Costa Sur";
  if (clampedAltitude > 1500) region = "Altiplano Central/Occidental";
  else if (lng > -89.5) region = "Tierras Bajas del Norte / Caribe";
  else if (lat > 16.5) region = "Petén";
  else if (lng > -90 && lat < 15.5) region = "Oriente";

  res.status(200).json({
    altitude: Math.round(clampedAltitude),
    temp: Math.round(temp * 10) / 10,
    humidity: Math.round(Math.min(95, humidity)),
    precipitation: Math.round(precipitation),
    region,
    soilType: clampedAltitude > 1000 ? "Franco Arcilloso / Volcánico" : "Franco Arenoso / Aluvial",
    risks: precipitation > 2000 ? ["Inundaciones", "Erosión"] : (temp > 25 ? ["Sequía", "Plagas"] : ["Heladas"])
  });
}
