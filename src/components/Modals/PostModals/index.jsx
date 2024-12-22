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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// Import Emoji Picker
import EmojiPicker from "emoji-picker-react";

// Import React
import { useRef, useState } from "react";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  const images = useRef([]);
  const [uploadImage, setUploadImage] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files;

    if (file) {
      images.current = [...images, ...file];
      images.current.map((image) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadImage([...uploadImage, reader.result]);
        };
        reader.readAsDataURL(image);
      });
    }
  };

  const handleRemoveImage = (index) => {
    uploadImage.splice(index, 1);
    setUploadImage([...uploadImage]);
  };

  console.log(uploadImage);

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
        <Box display="flex" gap="1rem" borderBottom="1px solid #eee">
          <Box>
            <AccountCircleIcon sx={{ fontSize: 45 }} />
          </Box>
          <Box>
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
            <Box sx={{ borderRadius: "10px", overflow: "hidden", mb: "1rem" }}>
              <ImageList cols={1}>
                {uploadImage &&
                  uploadImage.map((image, index) => (
                    <ImageListItem
                      key={index}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <img src={image} />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: "absolute",
                          right: "0",
                          color: "white",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ImageListItem>
                  ))}
              </ImageList>
            </Box>
          </Box>
        </Box>
        <Box
          pt="1rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex">
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              sx={{
                minWidth: "20px",
                color: "inherit",
              }}
            >
              <InsertPhotoIcon />
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </Button>
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
          <Button variant="contained" color="primary">
            Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModals;
