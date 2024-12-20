import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const style = {
  borderRadius: "20px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "1rem",
};

// eslint-disable-next-line react/prop-types
function PostModals({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ m: "-0.5rem 0 0.5rem -0.5rem" }}>
          <IconButton>
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
          <Input
            autoFocus={true}
            fullWidth
            disableUnderline
            placeholder="What is happening?"
          />
        </Box>
        <Box pt="1rem">
          <IconButton>
            <InsertPhotoIcon />
          </IconButton>
          <IconButton>
            <EmojiEmotionsIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModals;
