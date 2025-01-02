import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { useState, useEffect } from "react";

import checkPassword, {
  statusPassword,
  hasLowerCase,
  hasNumber,
  hasSpecialCharacter,
  hasUpperCase,
} from "../../../../helper/checkPassword";

// eslint-disable-next-line react/prop-types
function StatusPassword({ value = "" }) {
  const [errors, setErrors] = useState({
    minLength: false,
    specialChar: false,
    capitalChar: false,
    lowercase: false,
    number: false,
  });

  useEffect(() => {
    setErrors({
      minLength: value.length < 8,
      specialChar: !hasSpecialCharacter(value),
      capitalChar: !hasUpperCase(value),
      lowercase: !hasLowerCase(value),
      number: !hasNumber(value),
    });
  }, [value]);

  return checkPassword(value) ? (
    <Box mb={2.5}>
      <Alert variant="outlined" severity="success">
        Mật khẩu của bạn hợp lệ.
      </Alert>
    </Box>
  ) : (
    <Box
      sx={{
        textAlign: "start",
        border: "1px solid #c4c4c4",
        borderRadius: "4px",
        p: "8px 16px",
        mb: 2.5,
      }}
    >
      <Typography sx={{ fontSize: "14px" }}>
        Mật khẩu của bạn phải chứa:
      </Typography>
      {statusPassword.map(({ label, key }) => (
        <Box
          display="flex"
          alignItems="center"
          gap="8px"
          my="4px"
          key={key}
          color={errors[key] ? "" : "#4caf50"}
        >
          {errors[key] ? "*" : <CheckCircleOutlineIcon fontSize="small" />}
          <Typography sx={{ fontSize: "14px" }}>{label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default StatusPassword;
