import Button from "@mui/material/Button";

// eslint-disable-next-line react/prop-types
function InputSubmit({ children }) {
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      sx={{
        height: "1.4375em",
        p: "16.5px 0px",
        boxSizing: "content-box",
        mb: 2,
      }}
    >
      {children}
    </Button>
  );
}

export default InputSubmit;
