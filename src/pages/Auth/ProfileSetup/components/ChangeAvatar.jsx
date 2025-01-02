import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Box from "@mui/material/Box";

import { useState } from "react";
import AvatarEditor from "react-avatar-edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "4px",
  width: "700px",
  boxShadow: 24,
  display: "flex",
  justifyContent: "center",
  p: 4,
};

function ChangeAvatar({ setAvatar }) {
  const [open, setOpen] = useState(false);
  const handleChangeAvatar = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Image Handle
  const [preview, setPreview] = useState(null); // Lưu trữ ảnh preview
  const [image, setImage] = useState(null); // Lưu trữ ảnh gốc

  // Hàm để lấy ảnh sau khi crop
  const handleCrop = (view) => {
    setPreview(view);
    setAvatar(view); // Lưu ảnh đã crop vào state
  };

  // Hàm để reset lại ảnh
  const handleReset = () => {
    setImage(null);
    setPreview(null);
  };

  // Hàm để tải ảnh từ máy tính
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      // Chờ ảnh được load xong
      img.onload = () => {
        // Giới hạn kích thước ảnh nếu cần thiết
        const MAX_WIDTH = 1000; // Ví dụ giới hạn độ rộng ảnh tối đa
        const MAX_HEIGHT = 1000; // Ví dụ giới hạn độ cao ảnh tối đa

        let width = img.width;
        let height = img.height;

        // Nếu ảnh quá lớn, giảm kích thước để phù hợp
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = width * scale;
          height = height * scale;
        }

        // Đặt ảnh đã chỉnh kích thước vào state
        setImage(URL.createObjectURL(file));
      };
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleChangeAvatar}
        sx={{
          color: "#444",
          border: "1px solid #c4c4c4",
          position: "absolute",
          bottom: "20px",
        }}
      >
        <BorderColorIcon fontSize="small" />
        <Typography sx={{ ml: "4px" }}>Thay đổi</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AvatarEditor
            imageWidth={500}
            cropRadius={125} // Đặt bán kính crop thành vòng tròn
            image={image} // Ảnh được tải lên
            onCrop={handleCrop} // Hàm xử lý crop
            onClose={handleReset} // Hàm reset ảnh
            label="Chỉnh sửa avatar" // Tiêu đề
          />
          {/* {preview && (
            <img
              src={preview}
              alt="Preview Avatar"
              style={{
                maxWidth: "100%",
                maxHeight: "250px",
                objectFit: "contain",
              }}
            />
          )} */}
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

// import React, { useState, useRef } from "react";

// function ChangeAvatar() {
//   const [image, setImage] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 100, y: 50, width: 100, height: 100 });
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);

//   // Hàm tải ảnh
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Hàm để crop ảnh
//   const handleCrop = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const image = imageRef.current;
//     console.log(ctx);

//     const { x, y, width, height } = crop;

//     // Set kích thước canvas để phù hợp với khu vực crop
//     canvas.width = width;
//     canvas.height = height;

//     // Vẽ ảnh đã crop lên canvas
//     ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

//     // Lấy ảnh đã crop từ canvas dưới dạng base64
//     const croppedUrl = canvas.toDataURL();
//     setCroppedImage(croppedUrl);
//   };

//   // Hàm để điều chỉnh vùng crop
//   const handleDrag = (e) => {
//     const { movementX, movementY } = e;
//     // console.log(movementX, movementY);
//     setCrop((prev) => ({
//       ...prev,
//       x: prev.x + movementX,
//       y: prev.y + movementY,
//     }));
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       {image && (
//         <div style={{ position: "relative", display: "inline-block" }}>
//           <img
//             src={image}
//             alt="Avatar"
//             ref={imageRef}
//             style={{ width: "300px", height: "auto" }}
//           />
//           <div
//             onMouseDown={(e) => e.preventDefault()}
//             style={{
//               position: "absolute",
//               top: crop.y,
//               left: crop.x,
//               width: crop.width,
//               height: crop.height,
//               border: "2px solid red",
//               borderRadius: "50%",
//               cursor: "move",
//             }}
//             onMouseMove={handleDrag}
//           />
//         </div>
//       )}
//       <button onClick={handleCrop}>Crop Image</button>
//       {croppedImage && <img src={croppedImage} alt="Cropped Avatar" />}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// }

// export default ChangeAvatar;
