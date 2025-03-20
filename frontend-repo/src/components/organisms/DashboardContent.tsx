"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllUsers } from "@/store/userSlice";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function DashboardContent() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.user);

  const handleFetchUsers = () => {
    dispatch(getAllUsers());
  };

  return (
    <Box>
      <Typography variant="h4">User List</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchUsers}
        sx={{ mt: 2 }}
      >
        Fetch All Users
      </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Typography color="error">{error}</Typography>}

      {data.length > 0 && (
        <List sx={{ mt: 2 }}>
          {data.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.displayName} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
