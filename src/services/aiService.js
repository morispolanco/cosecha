export const generateAgriculturalReport = async (data) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al generar el reporte');
    }

    return await response.json();
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
};

export const getClimateAnalysis = async (coords) => {
  try {
    const response = await fetch('/api/climate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coords),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al obtener datos climáticos');
    }

    return await response.json();
  } catch (error) {
    console.error('Climate Service Error:', error);
    throw error;
  }
};
