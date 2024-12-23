import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Import Emoji Picker
import EmojiPicker from "emoji-picker-react";

// React hooks
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function EmojiButton({ getEmoji }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openEmoji = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
  );
}

export default EmojiButton;
