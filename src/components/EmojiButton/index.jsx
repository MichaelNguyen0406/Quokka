import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

// Import Emoji Picker
import EmojiPicker from "emoji-picker-react";

// React hooks
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function EmojiButton({ getEmoji, emojiBorder, ...otherProps }) {
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
        {emojiBorder ? <InsertEmoticonIcon /> : <EmojiEmotionsIcon />}
      </IconButton>
      <Menu
        {...otherProps}
        anchorEl={anchorEl}
        open={openEmoji}
        onClose={handleClose}
      >
        <MenuItem>
          <EmojiPicker height="300px" onEmojiClick={getEmoji} searchDisabled />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default EmojiButton;
