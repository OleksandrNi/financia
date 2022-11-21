import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../store/userDataSlice";
import { writeUserData } from "../firebase/writeUserData";
import { useUser } from "../firebase/useUser";
import { useEffect, useState } from "react";

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

export default function UserInfoModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useUser();
  const { userData } = useSelector((state) => state.userDataSlice);

  const [userInfo, setUserInfo] = useState(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo(userData);
  }, [userData]);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSave = () => {
    dispatch(setUserData({ ...userInfo }));
    writeUserData(user, userInfo, process.env.NEXT_PUBLIC_FIREBASE_USER_DATA);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User information
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fill in the required fields
          </Typography>

          <>
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={userInfo.firstName}
              label="First Name"
              variant="standard"
              name="firstName"
              type="text"
              onChange={onChange}
            />
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={userInfo.lastName}
              label="Last Name"
              variant="standard"
              name="lastName"
              type="text"
              onChange={onChange}
            />
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={userInfo.street}
              label="Street"
              variant="standard"
              name="street"
              type="text"
              onChange={onChange}
            />
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={userInfo.postal}
              label="Postal ZIP"
              variant="standard"
              name="postal"
              type="text"
              onChange={onChange}
            />
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={userInfo.city}
              label="City"
              variant="standard"
              name="city"
              type="text"
              onChange={onChange}
            />
            <TextField
              sx={{ mt: 2 }}
              id="standard-basic"
              value={userInfo.country}
              label="Country"
              variant="standard"
              name="country"
              type="text"
              onChange={onChange}
            />
            <br />
            <Button sx={{ mt: 2 }} variant="outlined" onClick={onSave}>
              SAVE
            </Button>
          </>
        </Box>
      </Modal>
    </div>
  );
}
