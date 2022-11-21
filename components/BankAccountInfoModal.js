import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const link = {
  height: "60px",
  maxWidth: "90px",
};

export default function BankAccountInfoModal({ acc }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #000",
          borderRadius: "5px",
          padding: "5px",
          width: "100px",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <img
          src={acc.bank_logo}
          alt="bank logo"
          style={{ height: "60px", maxWidth: "90px" }}
        />
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
        <img
          src={acc.bank_logo}
          alt="bank logo"
          style={{ height: "60px", maxWidth: "90px" }}
        />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bank Account Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bank: {acc.bank_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Account owner: {acc.owner_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            IBAN: {acc.iban}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Balance: {acc.balances_amount} {acc.balances_cur}
          </Typography>
          <>
            <br />
            <Button
              sx={{ mt: 2, width: 2 / 5 }}
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
