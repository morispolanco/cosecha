export const getWeatherData = async (lat, lng) => {
  const response = await fetch('/api/climate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng }),
  });
  return await response.json();
};
