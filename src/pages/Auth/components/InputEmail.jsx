import TextField from "@mui/material/TextField";

// eslint-disable-next-line react/prop-types
function InputEmail({ error, touched, value, handleChange }) {
  return (
    <TextField
      sx={{ mb: 2.5 }}
      fullWidth
      name="email"
      type="email"
      label="Email*"
      onChange={handleChange}
      value={value}
      error={error && touched ? true : false}
      helperText={error && touched ? error : ""}
    />
  );
}

export default InputEmail;
