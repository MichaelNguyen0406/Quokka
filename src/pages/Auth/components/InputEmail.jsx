import TextField from "@mui/material/TextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// eslint-disable-next-line react/prop-types
function InputEmail({ error, value, handleChange, disabled }) {
  return (
    <TextField
      sx={{
        mb: 2.5,
        "& .MuiFormHelperText-root": {
          m: "0.5rem 0 0 0", // Loại bỏ margin của helperText
        },
      }}
      fullWidth
      disabled={disabled}
      name="email"
      type="email"
      label="Email*"
      onChange={handleChange}
      value={value}
      error={error}
      helperText={
        error ? (
          <span>
            <ErrorOutlineIcon
              fontSize="small"
              style={{ verticalAlign: "middle", marginRight: "4px" }}
            />{" "}
            Email không hợp lệ.
          </span>
        ) : (
          ""
        )
      }
    />
  );
}

export default InputEmail;
