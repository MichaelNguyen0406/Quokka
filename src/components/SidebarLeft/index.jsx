import Box from "@mui/material/Box";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import XIcon from "@mui/icons-material/X";
import { styled } from "@mui/material/styles";

// Import React Route Dom
import { NavLink } from "react-router-dom";

import PostModals from "../Modals/PostModals/index.jsx";
import ProfileMore from "./components/ProfileMore.jsx";
import NavLinkTo from "./components/NavLinkTo.jsx";
import { useAuth } from "../../contexts/authContext/index.jsx";

const Navbar = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    alignItems: "center",
  },
}));

function SidebarLeft() {
  const { userDetail } = useAuth();

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          maxWidth: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box>
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <XIcon sx={{ width: 40, height: 40 }} />
            </NavLink>
          </Box>
          <Navbar
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <NavLinkTo to="/" Icon={HomeIcon} primary="Home" />
            <NavLinkTo
              to="/bookmarks"
              Icon={BookmarkIcon}
              primary="Bookmarks"
            />
            <NavLinkTo to="/likes" Icon={FavoriteIcon} primary="Likes" />
            <NavLinkTo
              to={`/profile/${userDetail?.id}`}
              Icon={PersonOutlineIcon}
              primary="Profile"
            />
          </Navbar>
          <PostModals />
        </Box>
        <ProfileMore />
      </Box>
    </>
  );
}

export default SidebarLeft;
