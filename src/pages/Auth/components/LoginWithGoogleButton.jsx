import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

function LoginWithGoogleButton() {
  return (
    <LoadingButton
      variant="outlined"
      color="primary"
      fullWidth
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "1.4375em",
        p: "16.5px 0",
        boxSizing: "content-box",
      }}
    >
      <img
        style={{ padding: "1rem" }}
        src="https://auth.openai.com/assets/google-logo-NePEveMl.svg"
      />
      <Typography sx={{ flex: 1, fontSize: "1rem", color: "#2d333a" }}>
        Tiếp tục với Google
      </Typography>
    </LoadingButton>
  );
}

export default LoginWithGoogleButton;
