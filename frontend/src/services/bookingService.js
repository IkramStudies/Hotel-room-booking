import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/bookings";

export const getUserBookings = async () => {
  const response = await axios.get(`${API_URL}/my-bookings`, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchMyBookings = async () => {
  const response = await axios.get(`${API_URL}/my-bookings`, {
    withCredentials: true,
  });
  return response.data; // Ensure this matches your backend response structure
};

import api from "./api";

export const checkRoomAvailability = async (bookingData) => {
  try {
    const response = await api.post(
      "/bookings/check-availability",
      bookingData,
    );
    return response.data; // Expected { available: true/false }
  } catch (error) {
    console.error("Error checking availability:", error);
    throw error;
  }
};
