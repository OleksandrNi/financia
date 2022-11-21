import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useUser } from "../firebase/useUser";
import { useState } from "react";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ChangeEmailModal() {
  const { changeUserEmail } = useUser();
  const [open, setOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [error, setError] = useState("");
  const [currentUserPassword, setCurrentUserPassword] = useState("");
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const handleOpen = () => {
    setOpen(true);
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const onChange = (e) => {
    setNewUserEmail(e.target.value);
    setError("");
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentUserPassword(e.target.value);
    setError("");
  };

  const onSave = async () => {
    if (!regex.test(newUserEmail)) {
      setError("You enter invalid email");
      setNewUserEmail("");
    } else {
      const result = await changeUserEmail(currentUserPassword, newUserEmail);
      if (result) {
        setCurrentUserPassword("");
        setNewUserEmail("");
        setError("");
        setOpen(false);
      } else {
        setError("You enter invalid password");
      }
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Change email</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Set new email
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fill in the required fields
          </Typography>

          <>
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={currentUserPassword}
              label="current password"
              variant="standard"
              name="currentPassword"
              type="password"
              onChange={onChangeCurrentPassword}
            />

            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={newUserEmail}
              label="new email"
              variant="standard"
              name="newEmail"
              type="text"
              onChange={onChange}
            />
            <br />
            <p style={{ color: "red" }}>{error}</p>
            <br />
            <div style={{ display:'flex' }}>

            <Button
              sx={{ mt: 2, width: 3 / 5 }}
              variant="outlined"
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              sx={{ mt: 2, ml: 3, width: 3 / 5 }}
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
            </div>
          </>
        </Box>
      </Modal>
    </div>
  );
}
