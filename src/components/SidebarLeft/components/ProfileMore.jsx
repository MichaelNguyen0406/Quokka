import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { doSignOut } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import Avatar from "@mui/material/Avatar";

function ProfileMore() {
  const { userDetail } = useAuth();
  // Sign Out

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
        <Avatar src={userDetail?.photoURL} />
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
                {userDetail?.displayName}
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
        <MenuItem onClick={() => doSignOut()}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMore;
