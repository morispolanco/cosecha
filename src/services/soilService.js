export const getSoilData = async (lat, lng) => {
  // Logic to fetch soil data
  const response = await fetch('/api/climate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng }),
  });
  const data = await response.json();
  return {
    type: data.soilType,
    nutrients: ["Nitrógeno", "Fósforo", "Potasio"],
    ph: 6.5
  };
};
