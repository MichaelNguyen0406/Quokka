import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import IosShareIcon from "@mui/icons-material/IosShare";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

import { useState } from "react";

import EmojiButton from "../../../EmojiButton";

import { addDocument } from "../../../../firebase/service";
import { useAuth } from "../../../../contexts/authContext";

import { style, styleHeader, styleBody } from "./ShareButtonStyles";

// eslint-disable-next-line react/prop-types
function ShareButton({ post = {} }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { userDetail } = useAuth();

  // Input handle
  const handleValue = (e) => {
    setValueInput(e.target.value);
  };

  // Emoji handle
  const getEmoji = ({ emoji }) => {
    setValueInput((prev) => prev + emoji);
  };

  // Modal turn On/Off
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Share handle
  const handleShare = async () => {
    if (!valueInput.trim().length) {
      setSnackbar({
        open: true,
        message: "Please enter some text before sharing.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const dataShare = {
        user_id_share: userDetail.id,
        post_id: post.id,
        caption_user_share: valueInput,
      };
      await addDocument("shares", dataShare);
      setSnackbar({
        open: true,
        message: "Shared successfully!",
        type: "success",
      });
    } catch (error) {
      console.log("Error share data: ", error);
      setSnackbar({
        open: true,
        message: error.message || "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOpen();
          }}
        >
          <IosShareIcon fontSize="small" />
        </IconButton>
        <Typography
          sx={{
            fontSize: "14px",
            gap: "5px",
            opacity: post?.shareCount ? "1" : "0",
          }}
        >
          {post?.shareCount}
        </Typography>
      </Box>
      <Modal
        open={open}
        onClick={(e) => e.stopPropagation()}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={styleHeader}>
            <Typography variant="h6" fontWeight="bold">
              Share
            </Typography>
            <Box
              sx={{
                position: "absolute",
                right: "1rem",
                bgcolor: "#e2e5e9",
                borderRadius: "50%",
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <hr />
          <Box sx={styleBody}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar />
              <Typography
                sx={{ fontSize: "16px", fontWeight: "bold", color: "#121213" }}
              >
                {userDetail?.displayName}
              </Typography>
            </Box>
            <Box>
              <Input
                onChange={handleValue}
                value={valueInput}
                fullWidth
                placeholder="Say something about this content..."
                disableUnderline
                sx={{
                  p: ".5rem 0",
                }}
              />
            </Box>
            <Box textAlign="end" mr="-8px">
              <EmojiButton
                getEmoji={getEmoji}
                emojiBorder
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                height="200px"
              />
            </Box>
            <Box textAlign="end">
              <LoadingButton
                loading={loading}
                variant="contained"
                size="small"
                onClick={handleShare}
              >
                Share
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ShareButton;
