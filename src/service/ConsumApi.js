import axios from 'axios';

// Método para obtener el objeto por ID
export const fetchObjectById = async (id) => {
  try {
    const response = await axios.get(`https://api.restful-api.dev/objects/${id}`);
    return response.data; // Devuelve los datos del objeto
  } catch (error) {
    console.error("Error al cargar los datos del objeto:", error);
    throw error;
  }
};

// Exportar las funciones de la API
export default {
  fetchObjectById,
  getData() {
    return apiClient.get('/data'); // Cambia '/data' por el endpoint específico
  },
  postData(payload) {
    return apiClient.post('/data', payload);
  }
};
