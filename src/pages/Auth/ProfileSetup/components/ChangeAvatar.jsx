import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";

import { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import ImageButton from "../../../../components/ImageButton";

// const ChangeAvatar = () => {
//   const [src, setSrc] = useState(null);

//   const onFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => setSrc(reader.result);
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={onFileChange} />
//       {src && (
//         <Cropper
//           src={src}
//           style={{ height: 400, width: "100%" }}
//           aspectRatio={1}
//           guides={false}
//           scalable={true}
//           cropBoxResizable={true}
//         />
//       )}
//     </div>
//   );
// };

// export default ChangeAvatar;

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
  const [open, setOpen] = useState(false);

  const [src, setSrc] = useState(null); // Để lưu trữ ảnh tải lên

  const handleClose = () => {
    setOpen(false);
    setSrc(null);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result); // Đọc file ảnh khi người dùng chọn ảnh
    reader.readAsDataURL(file);
    setOpen(true);
  };

  const onCrop = () => {
    // Lấy dữ liệu ảnh đã cắt
    const cropper = document.getElementById("cropper"); // Lấy reference đến element Cropper
    const croppedData = cropper.cropper.getCroppedCanvas().toDataURL(); // Convert canvas thành ảnh base64
    setAvatar(croppedData);
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
          <Box sx={{ textAlign: "center", p: 2.5 }}>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              Chọn ảnh đại diện
            </Typography>
          </Box>
          <hr />
          <Box sx={{ p: 4, textAlign: "center" }}>
            {src && (
              <>
                <Cropper
                  id="cropper"
                  src={src}
                  style={{ width: "100%", height: "auto" }} // Kích thước của cropper
                  aspectRatio={1} // Tỉ lệ cắt (1:1 là hình vuông)
                  guides={false} // Hiển thị hướng dẫn lưới
                  scalable={true} // Cho phép kéo giãn
                  cropBoxResizable={true} // Cho phép điều chỉnh kích thước hộp cắt
                />
                <Button variant="outlined" onClick={onCrop} sx={{ mt: 2.5 }}>
                  Cắt ảnh
                </Button>
              </>
            )}
          </Box>
          <hr />
          <Box sx={{ p: 2, textAlign: "end" }}>
            <Button sx={{ mr: 1 }} onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant="contained">Hoàn tất</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ChangeAvatar;
{
  /* <Box display="flex" justifyContent="center" mt={4}>
            <ImageButton onChange={handleFileChange} variant="contained">
              Chỉnh sửa
            </ImageButton>
          </Box> */
}
{
  /* <Box
            sx={{
              border: "1px solid #c4c4c4",
              width: "400px",
              height: "400px",
            }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={
                file
                  ? convertFile(file)
                  : "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
              }
            />
          </Box> */
}
