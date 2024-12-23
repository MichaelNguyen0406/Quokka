import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Hidden from "@mui/material/Hidden";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import XIcon from "@mui/icons-material/X";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// Import React Hooks
import { useState } from "react";

// Import React Route Dom
import { NavLink } from "react-router-dom";

// Import Auth
import { doSignOut } from "../../firebase/auth.js";

import PostModals from "../Modals/PostModals/index.jsx";

const Navbar = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    alignItems: "center",
  },
}));

function SidebarLeft() {
  // Sign Out
  const handleSignOut = () => {
    doSignOut();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        }}
      >
        <Box>
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
            }}
          >
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <Box>
                  <HomeIcon fontSize="medium" color="action" />
                </Box>
                <Hidden lgDown>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "18px",
                      ml: 2,
                    }}
                    primary="Home"
                  />
                </Hidden>
              </ListItem>
            </NavLink>
            <NavLink
              to="/bookmark"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <Box>
                  <BookmarkIcon fontSize="medium" color="action" />
                </Box>
                <Hidden lgDown>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "18px",
                      ml: 2,
                    }}
                    primary="Bookmarks"
                  />
                </Hidden>
              </ListItem>
            </NavLink>
            <NavLink
              to="/like"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <Box>
                  <FavoriteIcon fontSize="medium" color="action" />
                </Box>
                <Hidden lgDown>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "18px",
                      ml: 2,
                    }}
                    primary="Likes"
                  />
                </Hidden>
              </ListItem>
            </NavLink>
            <NavLink
              to="profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <Box>
                  <PersonOutlineIcon fontSize="medium" color="action" />
                </Box>
                <Hidden lgDown>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "18px",
                      ml: 2,
                    }}
                    primary="Profile"
                  />
                </Hidden>
              </ListItem>
            </NavLink>
            <NavLink
              to="profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                id="basic-button"
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <Box>
                  <LogoutIcon fontSize="medium" color="action" />
                </Box>
                <Hidden lgDown>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "18px",
                      ml: 2,
                    }}
                    primary="Logout"
                  />
                </Hidden>
              </ListItem>
            </NavLink>
          </Navbar>
          <PostModals />
        </Box>
        <Box
          onClick={handleClick}
          sx={{
            mb: "40px",
            p: ".5rem .3rem",
            display: "flex",
            alignItems: "center",
            borderRadius: "28px",
            "&:hover": {
              bgcolor: "#eee",
              cursor: "pointer",
            },
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40 }} />
          <Hidden lgDown>
            <Box
              mx=".5rem"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box textAlign="start">
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#444",
                    fontWeight: "bold",
                  }}
                >
                  Nguyễn Trường An
                </Typography>
                <Typography sx={{ fontSize: "15px" }}>@michael</Typography>
              </Box>
              <MoreHorizIcon />
            </Box>
          </Hidden>
        </Box>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoFocus={false}
          sx={{
            "& .MuiPaper-root": {
              width: "300px", // Đặt chiều rộng
              maxHeight: "400px", // Đặt chiều cao tối đa
            },
          }}
        >
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default SidebarLeft;
