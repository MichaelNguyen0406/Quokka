import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";

import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import ImageButton from "../../../../components/ImageButton";
import useImageUploader from "../../../../hooks/useImagesUploader";
import { updateCollectionFieldById } from "../../../../firebase/service";
import { useAuth } from "../../../../contexts/authContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "4px",
  width: "700px",
  boxShadow: 24,
};

// eslint-disable-next-line react/prop-types
function ChangeAvatar({ setAvatar }) {
  // Modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setSrc(null);
  };

  // Image
  const [src, setSrc] = useState(null);
  const cropperRef = useRef();
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setOpen(true);
      setSrc(imgURL);
    }
  };

  // Image Handle
  const { userDetail } = useAuth();
  const { uploadImages, uploading } = useImageUploader(
    "dohadwixt",
    "social_network"
  );
  const onCrop = async () => {
    const cropper = cropperRef.current;
    const croppedData = cropper.cropper.getCroppedCanvas().toDataURL();
    const url = await uploadImages([croppedData]);
    await updateCollectionFieldById(
      "users",
      userDetail?.id,
      "photoURL",
      url[0]
    );
    setAvatar(croppedData);
    setOpen(false);
  };

  return (
    <>
      <ImageButton
        variant="outlined"
        onChange={onFileChange}
        sx={{
          color: "#444",
          border: "1px solid #c4c4c4",
          position: "absolute",
          bottom: "20px",
        }}
      >
        <BorderColorIcon fontSize="small" />
        <Typography sx={{ ml: "4px" }}>Thay đổi</Typography>
      </ImageButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center", p: 2.5, position: "relative" }}>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Chọn ảnh đại diện
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
                bgcolor: "#e2e5e9",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <hr />
          <Box sx={{ p: 4, textAlign: "center" }}>
            {src && (
              <>
                <Cropper
                  ref={cropperRef}
                  src={src}
                  style={{ width: "100%", height: "auto" }} // Kích thước của cropper
                  aspectRatio={1} // Tỉ lệ cắt (1:1 là hình vuông)
                  guides={true} // Hiển thị hướng dẫn lưới
                  scalable={true} // Cho phép kéo giãn
                  movable={true}
                  background={false}
                  viewMode={2}
                  responsive={true}
                  zoomable={true}
                  autoCropArea={1}
                  dragMode="move"
                  cropBoxResizable={false} // Cho phép điều chỉnh kích thước hộp cắt
                />
              </>
            )}
          </Box>
          <hr />
          <Box sx={{ p: 2, textAlign: "end" }}>
            <Button sx={{ mr: 1 }} onClick={handleClose}>
              <Typography color="primary" sx={{ fontWeight: "bold" }}>
                Hủy
              </Typography>
            </Button>
            <LoadingButton
              loading={uploading}
              variant="contained"
              onClick={onCrop}
            >
              Hoàn tất
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ChangeAvatar;
