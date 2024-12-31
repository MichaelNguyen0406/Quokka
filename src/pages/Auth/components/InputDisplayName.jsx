import TextField from "@mui/material/TextField";

// eslint-disable-next-line react/prop-types
function InputDisplayName({ error, touched, value, handleChange }) {
  return (
    <TextField
      sx={{ mb: 2.5 }}
      fullWidth
      name="displayName"
      type="text"
      label="Tên hiển thị*"
      onChange={handleChange}
      value={value}
      error={error && touched ? true : false}
      helperText={error && touched ? error : ""}
    />
  );
}

export default InputDisplayName;
