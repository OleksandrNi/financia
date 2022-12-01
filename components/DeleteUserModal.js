import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Router from "next/router";
import { useUser } from "../firebase/useUser";
import { useState } from "react";
import { writeUserData } from "../firebase/writeUserData";
import { TextField } from "@mui/material";
import { deleteUserData } from "../firebase/deleteUserData";

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

export default function DeleteUserModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentUserPassword, setCurrentUserPassword] = useState("");
  const [error, setError] = useState("");
  const { user, deleteUserAccount } = useUser();

  const onDeleteAccount = async () => {
    const result = await deleteUserAccount(currentUserPassword);
    setCurrentUserPassword("");
    if (result) {
      await deleteUserData(user, process.env.NEXT_PUBLIC_FIREBASE_USER_DATA);
      await deleteUserData(
        user,
        process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_LIST
      );
      await deleteUserData(
        user,
        process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_ACCOUNT_BANK_DATA
      );
      await deleteUserData(
        user,
        process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_TO_APROVE
      );
      await deleteUserData(
        user,
        process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_COUNTRY_BANK_LIST
      );
      Router.push("/auth");
    } else {
      setError("You entered wrong password");
    }
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentUserPassword(e.target.value);
    setError("");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Delete account</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete account
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            After deletion, all data on your account will be deleted
          </Typography>

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
          <p style={{ color: "red" }}>{error}</p>
          <>
            <Button
              sx={{
                mt: 2,
                backgroundColor: "#CD447D",
                color: "#fff",
                ":hover": {
                  color: "#000",
                },
              }}
              variant="outlined"
              onClick={() => onDeleteAccount()}
            >
              Delete account
            </Button>

            <Button
              sx={{
                mt: 2,
                ml: 3,
                width: 1 / 5,
                backgroundColor: "#CD447D",
                color: "#fff",
                ':hover': {
                  color: "#000"
                }
              }}
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </>
        </Box>
      </Modal>
    </div>
  );
}
