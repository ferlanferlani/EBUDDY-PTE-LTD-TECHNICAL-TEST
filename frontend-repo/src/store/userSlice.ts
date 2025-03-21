import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers } from "@/apis/userApi";

export interface UserState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Async Thunk untuk Fetch All Users
export const getAllUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllUsers();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil data user."
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
