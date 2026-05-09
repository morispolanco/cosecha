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
    2. "analysis": Explicación técnica de por qué estos cultivos son aptos para estas condiciones.
    3. "planting_calendar": Guía paso a paso sobre cuándo empezar la siembra, meses críticos y fechas estimadas de cosecha.
    4. "soil_nutrients": Lista detallada de nutrientes (nitrógeno, fósforo, potasio y micronutrientes) necesarios.
    5. "fertilization_strategy": Estrategia de fertilización (tipos de fertilizantes, dosis y frecuencia).
    6. "pest_and_disease": Recomendaciones de pesticidas, fungicidas y métodos de control preventivo para plagas comunes en la zona.
    7. "irrigation_management": Necesidades de agua y consejos de riego basados en la precipitación regional.
    8. "climate_risks": Riesgos climáticos específicos y cómo mitigarlos (inundación, sequía, heladas).
    9. "management_tips": Consejos prácticos para maximizar la productividad y calidad del producto.
    10. "summary": Un resumen simple y motivador para el agricultor.

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
      return res.status(500).json({ error: 'Error de la IA: ' + data.error.message });
    }

    let content = data.choices[0].message.content;
    
    // Clean markdown code blocks if present
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const result = JSON.parse(content);
      res.status(200).json(result);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Content:', content);
      res.status(500).json({ error: 'Error al procesar la respuesta de la IA' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
