import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

// Import file
import ProfileIcon from "./components/IconButton/ProfileIcon";
import Notification from "./components/IconButton/Notification";
import MenuAppBar from "./components/IconButton/MenuAppBar";
import Message from "./components/IconButton/Message";
import SearchBar from "./components/SearchBar";

import { NavLink } from "react-router-dom";

function Header() {
  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        px: 1,
      }}
    >
      <Box mr={2}>
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            backgroundColor: "inherit",
          }}
        >
          <img
            style={{
              width: "60px",
              height: "auto",
            }}
            src="https://res.cloudinary.com/dohadwixt/image/upload/v1735587953/aOHHsQACSf645PnYWA2AeQ_dg4lpg-removebg-preview_2_vmhuxh.png"
          />
        </NavLink>
      </Box>
      <Box>
        <SearchBar />
      </Box>
      <Box flexGrow={1}></Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* <Message />
        <MenuAppBar /> */}
        <Notification />
        <ProfileIcon />
      </Box>
    </AppBar>
  );
}

export default Header;
