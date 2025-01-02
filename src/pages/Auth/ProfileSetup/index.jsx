// Import MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// Import file
import InputDisplayName from "../components/InputDisplayName";
import ChangeAvatar from "./components/ChangeAvatar";

// Import Lib
import { useState } from "react";

function ProfileSetup() {
  document.title = "Hoàn tất hồ sơ - Quokka";

  const [nextAvatar, setNextAvatar] = useState(false);

  // State Avatar Handle
  const [avatar, setAvatar] = useState("");

  // State Displayname Handle
  const [displayname, setDisplayname] = useState("");

  const handleNext = () => {
    setNextAvatar(true);
  };

  const handleBack = () => {
    setNextAvatar(false);
  };

  const handleSubmit = () => {
    // ...
  };

  return (
    <Box sx={{ width: "320px", textAlign: "center", padding: 5 }}>
      <Box mb={5.5}>
        <img
          style={{
            width: "80px",
            height: "auto",
          }}
          src="https://res.cloudinary.com/dohadwixt/image/upload/v1735587953/aOHHsQACSf645PnYWA2AeQ_dg4lpg-removebg-preview_2_vmhuxh.png"
        />
      </Box>
      <Box mb={5}>
        <Alert severity="success">
          Tuyệt vời! Bạn đã đăng ký thành công, Hãy thiết lập hồ sơ của bạn và
          khám phá thế giới của chúng tôi!.
        </Alert>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2.5,
          color: "#2d333a",
        }}
      >
        {nextAvatar ? "Tên hiển thị" : "Ảnh đại diện"}
      </Typography>

      {nextAvatar ? (
        <InputDisplayName />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2.5,
            pt: 5,
            pb: 10,
            border: "1px solid #c4c4c4",
            position: "relative",
          }}
        >
          <Avatar sx={{ width: "240px", height: "240px" }} src={avatar} />
          <ChangeAvatar setAvatar={setAvatar} />
        </Box>
      )}

      {nextAvatar ? (
        <>
          <Button onClick={handleSubmit} variant="contained">
            Hoàn tất
          </Button>
          <Typography
            color="primary"
            onClick={handleBack}
            sx={{
              mt: 2,
              fontWeight: "bold",
              "&:hover": { cursor: "pointer" },
            }}
          >
            Quay lại
          </Typography>
        </>
      ) : (
        <Button onClick={handleNext} variant="contained">
          Tiếp tục
        </Button>
      )}
    </Box>
  );
}

export default ProfileSetup;
