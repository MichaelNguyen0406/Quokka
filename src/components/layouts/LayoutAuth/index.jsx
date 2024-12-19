import Box from "@mui/material/Box";

// eslint-disable-next-line react/prop-types
function LayoutAuth({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default LayoutAuth;
