import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Import Emoji Picker
import EmojiPicker from "emoji-picker-react";

// Import React
import { useState } from "react";

const style = {
  borderRadius: "20px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "1rem",
};

// eslint-disable-next-line react/prop-types
function PostModals({ open, onClose }) {
  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openEmoji = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Input
  const [valueInput, setValueInput] = useState("");
  const getEmoji = ({ emoji }) => {
    setValueInput(valueInput + emoji);
  };
  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  // Image
  const [images, setImages] = useState([]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ m: "-0.5rem 0 0.5rem -0.5rem" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          borderBottom="1px solid #eee"
          pb="4rem"
        >
          <Box>
            <AccountCircleIcon sx={{ fontSize: 45 }} />
          </Box>
          <Box>
            <Input
              sx={{ fontSize: "1.5rem" }}
              autoFocus={true}
              fullWidth
              disableUnderline
              placeholder="What is happening?"
              value={valueInput}
              onChange={handleChangeInput}
            />
          </Box>
        </Box>
        <Box pt="1rem" display="flex" alignItems="center">
          <IconButton>
            <InsertPhotoIcon />
          </IconButton>
          <Box>
            <IconButton onClick={handleClick}>
              <EmojiEmotionsIcon />
            </IconButton>
            <Menu
              transformOrigin={{ vertical: "bottom", horizontal: "center" }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              anchorEl={anchorEl}
              open={openEmoji}
              onClose={handleClose}
            >
              <MenuItem>
                <EmojiPicker onEmojiClick={getEmoji} />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModals;
