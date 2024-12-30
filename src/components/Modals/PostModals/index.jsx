import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Import React
import { useState } from "react";
import { addDocument } from "../../../firebase/service";

// Import Auth
import { useAuth } from "../../../contexts/authContext";
import { updateCollectionFieldById } from "../../../firebase/service";

// Import ImageUpload
import useImageUploader from "../../../hooks/useImagesUploader";

import EmojiButton from "../../EmojiButton";
import ImageButton from "../../ImageButton";
import ImagePreview from "../../ImagePreview";
import Avatar from "@mui/material/Avatar";
import { arrayUnion } from "firebase/firestore";

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

function PostModals() {
  // Open Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Auth
  const { userDetail } = useAuth();

  // Input
  const [valueInput, setValueInput] = useState("");
  const getEmoji = ({ emoji }) => {
    setValueInput((prev) => prev + emoji);
  };
  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };

  // Image
  const [images, setImages] = useState([]);
  const [uploadPost, setUploadPost] = useState(false);
  const { uploadImages } = useImageUploader("dohadwixt", "social_network");

  const handleImageChange = (e) => {
    const file = e.target.files;

    if (file) {
      setImages([...images, ...file]);

      console.log(file);
    }
  };

  // Post handle

  const handlePost = async () => {
    if (!images.length && !valueInput.length) {
      return;
    }
    setUploadPost(true);
    try {
      const urls = await uploadImages(images);
      if (urls.length) {
        const dataPost = {
          user_id: userDetail.id,
          caption: valueInput,
          imageURL: [...urls],
          listComment: [],
          commentCount: 0,
          likeCount: 0,
          shareCount: 0,
        };
        const post = await addDocument("posts", dataPost);
        await updateCollectionFieldById(
          "users",
          userDetail.id,
          "listPost",
          arrayUnion(post.id)
        );
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploadPost(false);
      setValueInput("");
      setOpenModal(false);
      setImages([]);
    }
  };

  return (
    <>
      <Box onClick={handleOpenModal} minWidth="100%">
        <Hidden lgDown>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: "28px",
              padding: "10px",
              textTransform: "capitalize",
            }}
          >
            Post
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              textAlign: "center",
              p: 0,
            }}
          >
            <AddCircleOutlineIcon sx={{ width: "1.5em", height: "1.5em" }} />
          </IconButton>
        </Hidden>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ m: "-0.5rem 0 0.5rem -0.5rem" }}>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box display="flex" gap="1rem" borderBottom="1px solid #eee">
            <Box>
              <Avatar src={userDetail?.photoURL} />
            </Box>
            <Box flex={1}>
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
              <ImagePreview imageList={images} setImageList={setImages} />
            </Box>
          </Box>
          <Box
            pt="1rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <ImageButton onChange={handleImageChange} />
              <EmojiButton
                getEmoji={getEmoji}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
            </Box>
            <LoadingButton
              onClick={handlePost}
              loading={uploadPost}
              variant="contained"
            >
              Post
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default PostModals;
