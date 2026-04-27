import api from "./api";

export const fetchAllRooms = async () => {
  try {
    const response = await api.get("/rooms/all");
    return response.data.data; // This is the array of 6 rooms
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    throw error;
  }
};
