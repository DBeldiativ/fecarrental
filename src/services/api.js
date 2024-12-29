import axios from 'axios';

const API_URL = 'http://localhost:5001/cars';

// Získání seznamu aut
export const getCars = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Přidání rezervace
export const addReservation = async (carId, reservation) => {
  const response = await axios.post(`${API_URL}/${carId}/reserve`, reservation);
  return response.data;
};
