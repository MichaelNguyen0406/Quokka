import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
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

import { NavLink } from "react-router-dom";

function SidebarLeft() {
  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        {/* <Box textAlign="center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <DiamondIcon sx={{ width: 50, height: 50 }} />
          </Link>
        </Box> */}
        <List>
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
              <ListItemIcon>
                <HomeIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
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
              <ListItemIcon>
                <BookmarkIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
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
              <ListItemIcon>
                <FavoriteIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
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
              <ListItemIcon>
                <PersonOutlineIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <ListItem
            id="basic-button"
            sx={{
              borderRadius: "28px",
              margin: ".5rem 0",
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" color="action" />
            </ListItemIcon>
            <Hidden lgDown>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "18px",
                }}
                primary="Logout"
              />
            </Hidden>
          </ListItem>
        </List>
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
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Hidden>
      </Box>
    </>
  );
}

export default SidebarLeft;
