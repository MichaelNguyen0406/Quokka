import LoadingButton from "@mui/lab/LoadingButton";

// eslint-disable-next-line react/prop-types
function InputSubmit({ children, loading }) {
  return (
    <LoadingButton
      fullWidth
      loading={loading}
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
    </LoadingButton>
  );
}

export default InputSubmit;
