import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-user-data`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data semua user.");
  }
};
