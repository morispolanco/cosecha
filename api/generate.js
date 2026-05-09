export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { location, climate, altitude, terrainData } = req.body;

  const prompt = `
    Eres un experto agrónomo de Guatemala con acceso a datos de MAGA e INSIVUMEH.
    Analiza las siguientes condiciones para un terreno en Guatemala:
    - Ubicación: ${location.lat}, ${location.lng}
    - Altitud: ${altitude} msnm
    - Temperatura: ${climate.temp}°C
    - Humedad: ${climate.humidity}%
    - Precipitación anual estimada: ${climate.precipitation} mm
    - Tipo de suelo regional: ${terrainData.soilType}
    - Riesgos detectados: ${terrainData.risks.join(', ')}

    Genera un informe técnico agrícola detallado en formato JSON que incluya:
    1. "recommended_crops": Lista de 3-5 cultivos ideales (ej: maíz, frijol, café, cardamomo, aguacate, etc.).
    2. "analysis": Explicación de por qué estos cultivos son aptos para estas condiciones específicas.
    3. "planting_calendar": Calendario sugerido (meses de siembra y cosecha).
    4. "soil_nutrients": Nutrientes que probablemente necesita el suelo según la región.
    5. "fertilization_strategy": Recomendaciones de fertilizantes.
    6. "climate_risks": Riesgos climáticos específicos (inundación, sequía, heladas).
    7. "management_tips": Consejos prácticos para maximizar la productividad.
    8. "summary": Un resumen simple para el agricultor.

    Responde ÚNICAMENTE con el objeto JSON puro, sin bloques de código markdown.
  `;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://agrointeligencia-gt.vercel.app',
        'X-Title': 'AgroInteligencia GT',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // Using free model as fallback or as specified
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenRouter Error:', data.error);
      return res.status(500).json({ error: 'Error de la IA' });
    }

    const result = JSON.parse(data.choices[0].message.content);
    res.status(200).json(result);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
