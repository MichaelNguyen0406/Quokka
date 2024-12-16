import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import XIcon from "@mui/icons-material/X";
import { styled } from "@mui/material/styles";

// Import React Route Dom
import { NavLink } from "react-router-dom";

const Navbar = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    alignItems: "center",
  },
}));

function SidebarLeft() {
  return (
    <>
      <Box
        sx={{ height: "100vh", maxWidth: "100%", p: 2, textAlign: "center" }}
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
        <Hidden lgDown>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon sx={{ width: "1.5em", height: "1.5em" }} />
          </IconButton>
        </Hidden>
      </Box>
    </>
  );
}

export default SidebarLeft;
