import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

if (!API_BASE_URL) {
  console.error("NEXT_PUBLIC_API_URL tidak ditemukan di .env!");
}

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-user-data`);
    console.log("Fetched Users:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data semua user."
    );
  }
};
