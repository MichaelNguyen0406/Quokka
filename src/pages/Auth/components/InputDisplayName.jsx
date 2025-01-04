import TextField from "@mui/material/TextField";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// eslint-disable-next-line react/prop-types
function InputDisplayName({ error, value, handleChange }) {
  return (
    <TextField
      sx={{ mb: 2.5 }}
      fullWidth
      name="displayName"
      type="text"
      // label="Tên hiển thị*\"
      placeholder="Tên hiển thị..."
      onChange={handleChange}
      value={value}
      error={error ? true : false}
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

export default InputDisplayName;
