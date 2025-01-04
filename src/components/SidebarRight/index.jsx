import { Search } from "@mui/icons-material";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

function SidebarRight() {
  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "#eee",
      }}
    >
      <Box padding="1rem">
        {/* <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          sx={{
            background: "#eee",
          }}
        >
          <Input
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "20px",
                  color: "#777",
                }}
              />
            }
          />
        </Box> */}
        {/* <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Who to follow
          </Typography>
          <Box textAlign="center" marginTop="1rem"></Box>
        </Box> */}
      </Box>
    </Box>
  );
}

export default SidebarRight;
