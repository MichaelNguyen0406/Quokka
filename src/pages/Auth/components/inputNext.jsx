import LoadingButton from "@mui/lab/LoadingButton";

// eslint-disable-next-line react/prop-types
function InputNext({ children, loading, onClick }) {
  return (
    <LoadingButton
      fullWidth
      loading={loading}
      onClick={onClick}
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

export default InputNext;
