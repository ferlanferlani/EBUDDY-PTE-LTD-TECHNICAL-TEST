"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllUsers, updateUser } from "@/store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import Button from "../atoms/Button";
import UserInfo from "../molecules/UserInfo";
import Typography from "../atoms/Typography";
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

type DashboardContentProps = {
  email: string | null;
};

export default function DashboardContent({ email }: DashboardContentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data = [], loading, error } = useAppSelector((state) => state.user);

  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [showData, setShowData] = useState(false);
  const [editUser, setEditUser] = useState<{
    id: string;
    displayName: string;
    email: string;
  } | null>(null);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleFetchUsers = async () => {
    if (!loading) {
      const action = await dispatch(getAllUsers());
      if (getAllUsers.fulfilled.match(action) && action.payload.length > 0) {
        setShowData(true);
      }
    }
  };

  const handleEditClick = (user: {
    uuid: string;
    displayName: string;
    email: string;
  }) => {
    setEditUser({
      id: user.uuid || "", // Fallback untuk menghindari error
      displayName: user.displayName || "Unknown",
      email: user.email || "No email",
    });
  };

  const handleUpdateUser = async () => {
    if (editUser) {
      const action = await dispatch(
        updateUser({
          id: editUser.id,
          userData: {
            displayName: editUser.displayName,
            email: editUser.email,
          },
        })
      );

      if (updateUser.fulfilled.match(action)) {
        await dispatch(getAllUsers()); // Refresh data agar email tetap muncul

        setSnackbarMessage("User successfully updated!");
        setOpenSnackbar(true); // Tampilkan Snackbar

        setEditUser(null); // Tutup dialog setelah update
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography color="primary" variant="h4">
        Welcome to Dashboard
      </Typography>

      {email ? (
        <UserInfo email={email} />
      ) : (
        <Typography variant="h4" color="primary">
          Loading user info...
        </Typography>
      )}

      <Button onClick={handleLogout} color="error" sx={{ mt: 2, mb: 2 }}>
        Logout
      </Button>

      <Button onClick={handleFetchUsers} color="primary" disabled={loading}>
        {loading ? "Fetching..." : "Fetch All Users"}
      </Button>

      {loading && (
        <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {showData && data.length > 0 && !loading && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" color="primary">
            List of Users
          </Typography>
          <Grid container spacing={2}>
            {data.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Avatar sx={{ width: 56, height: 56, mb: 2 }}>
                    {user.displayName ? user.displayName.charAt(0) : "?"}
                  </Avatar>
                  <Typography color="primary" variant="h6">
                    UID : {user.uuid || "Unknown"}
                  </Typography>
                  <CardContent>
                    <Typography color="primary" variant="h6">
                      {user.displayName || "Unknown"}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {user.email || "No email"}
                    </Typography>
                    <Button
                      onClick={() =>
                        handleEditClick({
                          uuid: user.uuid, // Gunakan uuid
                          displayName: user.displayName,
                          email: user.email,
                        })
                      }
                      color="primary"
                      sx={{ mt: 1 }}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Dialog untuk Edit User */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={editUser?.displayName || ""}
            onChange={(e) =>
              setEditUser((prev) =>
                prev ? { ...prev, displayName: e.target.value } : null
              )
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser((prev) =>
                prev ? { ...prev, email: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifikasi */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
