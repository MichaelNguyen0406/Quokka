// Import Mui
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";

// Import Lib
import { useState } from "react";

// Import file
import ModeSelect from "../ModeSelect";
import CustomIcon from "../components/CustomIcon";
import { doSignOut } from "../../../../../firebase/auth";

import { useAuth } from "../../../../../contexts/authContext";
import { Avatar, Typography } from "@mui/material";

function ProfileIcon() {
  // Auth
  const { userDetail } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Account Setting">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{ p: 0 }}
        >
          <CustomIcon icon={PersonIcon} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              borderRadius: "8px",
              minWidth: "370px",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              // "& .MuiAvatar-root": {
              //   width: 32,
              //   height: 32,
              //   ml: -0.5,
              //   mr: 1,
              // },
              "& .MuiIconButton-root": {
                padding: 0,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Box flex={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Avatar sx={{ fontSize: 45 }} src={userDetail?.photoURL} />
              <Typography fontWeight="bold">
                {userDetail?.displayName}
              </Typography>
            </Box>
            <Divider />
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ my: 2, fontWeight: "bold" }}
            >
              Xem trang cá nhân
            </Button>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <Settings fontSize="large" />
            </ListItemIcon>
            <Typography fontWeight="bold" ml={2.5}>
              Cài đặt
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => doSignOut()}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <Logout fontSize="large" />
            </ListItemIcon>
            <Typography fontWeight="bold" ml={2.5}>
              Đăng xuất
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }}>
          {/* <Typography fontWeight="bold">Mode:</Typography> */}
          <ModeSelect />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ProfileIcon;
