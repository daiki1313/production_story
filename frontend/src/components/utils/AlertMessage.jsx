import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertMessage = ({ open, setOpen, severity, message }) => {
  const handleCloseAlertMessage = (e, reason) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleCloseAlertMessage}
    >
      <Alert onClose={handleCloseAlertMessage} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
