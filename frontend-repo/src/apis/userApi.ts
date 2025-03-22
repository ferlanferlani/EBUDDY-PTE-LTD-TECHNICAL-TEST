import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL tidak ditemukan di .env!");
}

// ✅ Fetch All Users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-user-data`);
    if (!response.data || !response.data.data) {
      throw new Error("Data user tidak ditemukan dalam respons API.");
    }
    return response.data.data;
  } catch (error: any) {
    console.error("Error saat mengambil data user:", error);
    throw new Error(
      error.response?.data?.message || "Gagal mengambil data semua user."
    );
  }
};

// ✅ Update User (ID dikirim dalam body)
export const updateUserApi = async (
  uuid: string,
  userData: Partial<{ displayName: string; email: string }>
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update-user-data`, {
      uuid, // Mengirim ID dalam body
      ...userData, // Data yang di-update
    });

    if (!response.data || !response.data.success) {
      throw new Error("Gagal memperbarui data user.");
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Error saat memperbarui user:", error);
    throw new Error(error.response?.data?.message || "Gagal memperbarui user.");
  }
};
