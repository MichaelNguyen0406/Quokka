import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// Import React Route Dom
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  // Khi hover
  "&:hover": {
    backgroud: "red", // Màu khi hover
  },
}));

// eslint-disable-next-line react/prop-types
function NavLinkTo({ to, Icon, text }) {
  return (
    <StyledNavLink
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
          <Icon color="#ff6347" sx={{ fontSize: "30px" }} />
        </Box>
        <Hidden lgDown>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "16px", ml: 2, color: "#777" }}
          >
            {text}
          </Typography>
        </Hidden>
      </ListItem>
    </StyledNavLink>
  );
}

export default NavLinkTo;
