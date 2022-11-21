import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useUser } from "../firebase/useUser";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function ChangePaswordModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setError("");
    setNewUserPassword("");
    setNewUserPasswordValid("");
  };
  const handleClose = () => {
    setOpen(false);
    setError("");
    setNewUserPassword("");
    setNewUserPasswordValid("");
  };

  const { changeUserPassword } = useUser();

  const [currentUserPassword, setCurrentUserPassword] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPasswordValid, setNewUserPasswordValid] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const onChangeCurrentPassword = (e) => {
    setCurrentUserPassword(e.target.value);
    setError("");
  };
  const onChangeNewUserPassword = (e) => {
    setNewUserPassword(e.target.value);
    setError("");
  };
  const onChangeValidate = (e) => {
    setNewUserPasswordValid(e.target.value);
    setError("");
  };

  const onSave = async () => {
    if (!regex.test(newUserPassword)) {
      setError(
        "The password must contain at minimum 6 characters, at least one letter and one number"
      );
      setNewUserPassword("");
      setNewUserPasswordValid("");
      setCurrentUserPassword("");
    } else {
      if (newUserPassword !== newUserPasswordValid) {
        setError("Password does not match verification");
        setNewUserPassword("");
        setNewUserPasswordValid("");
      } else {
        const result = await changeUserPassword(
          currentUserPassword,
          newUserPassword
        );
        if (result) {
          setOpen(false);
          setCurrentUserPassword("");
          setNewUserPassword("");
          setNewUserPasswordValid("");
          setError("");
        } else {
          setError("You enter invalid current password");
        }
      }
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>Change password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Set new password
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The password must contain at minimum 6 characters, at least one
            letter and one number
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
              value={newUserPassword}
              label="new password"
              variant="standard"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              onChange={onChangeNewUserPassword}
            />
            <Button
              sx={{ mt: 4 }}
              variant="text"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </Button>
            <br />
            <TextField
              sx={{ mt: 2 }}
              id="standard"
              value={newUserPasswordValid}
              label="new password"
              variant="standard"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              onChange={onChangeValidate}
            />
            <Button
              sx={{ mt: 4 }}
              variant="text"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </Button>
            <br />
            <p style={{ color: "red" }}>{error}</p>
            <br />
            <div style={{ display: "flex" }}>
              <Button
                sx={{ mt: 2, width: 1 / 3 }}
                variant="outlined"
                onClick={onSave}
              >
                Save
              </Button>
              <Button
                sx={{ mt: 2, ml: 3, width: 1 / 3 }}
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
