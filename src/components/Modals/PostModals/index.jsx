import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

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
import { Typography } from "@mui/material";

const style = {
  borderRadius: "5px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
};

// eslint-disable-next-line react/prop-types
function PostModals({ setOpenModal, openModal }) {
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
      let dataPost = {
        user_id: userDetail.id,
        caption: valueInput,
        imageURL: [],
        listComment: [],
        commentCount: 0,
        likeCount: 0,
        shareCount: 0,
      };
      if (images?.length) {
        const urls = await uploadImages(images);
        dataPost = {
          ...dataPost,
          imageURL: [...urls],
        };
      }
      const post = await addDocument("posts", dataPost);
      await updateCollectionFieldById(
        "users",
        userDetail.id,
        "listPost",
        arrayUnion(post.id)
      );
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
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              position: "relative",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Tạo bài viết
            </Typography>
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                right: "1rem",
                bgcolor: "#e2e5e9",
                borderRadius: "50%",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <hr />
          <Box display="flex" gap="1rem" borderBottom="1px solid #eee" p={2}>
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
            p="1rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <ImageButton
                onChange={handleImageChange}
                sx={{ color: "inherit", minWidth: 0 }}
              >
                <InsertPhotoIcon />
              </ImageButton>
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
