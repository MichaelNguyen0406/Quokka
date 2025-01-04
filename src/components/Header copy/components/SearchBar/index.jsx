import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import { useState } from "react";

import { Search } from "@mui/icons-material";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: "20px",
//   backgroundColor: "#e2e5e9",
//   marginLeft: 0,
//   width: "100%",
//   height: 40,
//   [theme.breakpoints.down("sm")]: {
//     width: "40px",
//   },
//   [theme.breakpoints.up("sm")]: {
//     width: "100px",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 1),
//   color: "#727579",
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

function SearchBar() {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <Box
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
        placeholder="Tìm kiếm trên Quokka"
        startAdornment={
          <Search
            sx={{
              paddingLeft: "20px",
              color: "#777",
            }}
          />
        }
      />
    </Box>
  );
}

export default SearchBar;
