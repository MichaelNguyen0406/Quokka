import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";

import { deleteDocumentById } from "../../../firebase/service";
import { Typography } from "@mui/material";

import { useAuth } from "../../../contexts/authContext";

// eslint-disable-next-line react/prop-types
function ActionButton({ name, id }) {
  // Auth
  const { userDetail } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (userDetail?.listPost?.includes(id)) {
      setAnchorEl(e.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(false);
    deleteDocumentById(name, id);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: "bottom",
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
        <MenuItem
          onClick={handleDelete}
          sx={{ display: "flex", alignItems: "center", gap: 1, color: "red" }}
        >
          <DeleteIcon />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Delete
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EditIcon />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Edit
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ActionButton;
