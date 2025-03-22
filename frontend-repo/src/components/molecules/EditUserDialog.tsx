import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import Button from "../atoms/Button";
import { useState } from "react";

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (
    id: string,
    formData: { displayName: string; email: string }
  ) => void;
}

export default function EditUserDialog({
  open,
  onClose,
  user,
  onSave,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    email: user.email || "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(user.id, formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          name="displayName"
          label="Name"
          fullWidth
          value={formData.displayName}
          onChange={handleChange}
          sx={{ my: 1 }}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          sx={{ my: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
