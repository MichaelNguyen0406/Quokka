import TextField from "@mui/material/TextField";

// eslint-disable-next-line react/prop-types
function InputDisplayName({ error, touched, value, handleChange }) {
  return (
    <TextField
      sx={{ mt: 2.5 }}
      fullWidth
      name="displayName"
      type="text"
      label="Display Name"
      onChange={handleChange}
      value={value}
      error={error && touched ? true : false}
      helperText={error && touched ? error : ""}
    />
  );
}

export default InputDisplayName;
