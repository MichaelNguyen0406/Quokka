import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@mui/material/Hidden";

// Import React Route Dom
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function NavLinkTo({ to, Icon, primary }) {
  return (
    <NavLink
      to={to}
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
          <Icon />
        </Box>
        <Hidden lgDown>
          <ListItemText
            primaryTypographyProps={{
              fontSize: "18px",
              ml: 2,
            }}
            primary={primary}
          />
        </Hidden>
      </ListItem>
    </NavLink>
  );
}

export default NavLinkTo;
