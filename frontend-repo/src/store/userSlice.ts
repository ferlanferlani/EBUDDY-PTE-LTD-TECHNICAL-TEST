import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers, updateUserApi } from "@/apis/userApi";

export interface User {
  uuid: string;
  id: string;
  displayName: string;
  email: string;
}

export interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

// ✅ Fetch All Users
export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchAllUsers();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Gagal mengambil data user.");
  }
});

// ✅ Update User
export const updateUser = createAsyncThunk<
  User,
  { id: string; userData: Partial<User> },
  { rejectValue: string }
>("user/updateUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const updatedUser = await updateUserApi(id, userData);
    return updatedUser;
  } catch (error: any) {
    return rejectWithValue(error.message || "Gagal memperbarui data user.");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Handle Fetch Users
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
        state.error = action.payload || "Terjadi kesalahan.";
      })

      // ✅ Handle Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal memperbarui user.";
      });
  },
});

export default userSlice.reducer;
