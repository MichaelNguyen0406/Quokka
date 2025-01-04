// Import MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

// Import file
import InputDisplayName from "../components/InputDisplayName";
import ChangeAvatar from "./components/ChangeAvatar";
import { useAuth } from "../../../contexts/authContext";
import { updateCollectionFieldById } from "../../../firebase/service";

// Import Lib
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  document.title = "Hoàn tất hồ sơ - Quokka";
  const navigate = useNavigate();
  const [nextAvatar, setNextAvatar] = useState(false);

  // State Avatar Handle

  const [avatar, setAvatar] = useState("");

  // State Displayname Handle
  const { userDetail } = useAuth();
  const [errorName, setErrorName] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(userDetail?.displayName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail?.displayName]);

  const handleChange = (e) => {
    setDisplayName(e.target.value);
    setErrorName(false);
  };

  const handleNext = () => {
    setNextAvatar(true);
  };

  const handleBack = () => {
    setNextAvatar(false);
  };

  // Submit handle
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = async () => {
    if (displayName.length === 0) {
      setErrorName(true);
    } else {
      setLoadingSubmit(true);
      try {
        await updateCollectionFieldById(
          "users",
          userDetail?.id,
          "displayName",
          displayName
        );
        await updateCollectionFieldById(
          "users",
          userDetail?.id,
          "newUser",
          false
        );
        navigate("/");
      } catch (error) {
        console.log("Error profile setup", error);
      } finally {
        setLoadingSubmit(false);
      }
    }
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
        <InputDisplayName
          value={displayName}
          handleChange={handleChange}
          error={errorName}
        />
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
          <LoadingButton
            loading={loadingSubmit}
            onClick={handleSubmit}
            variant="contained"
          >
            Hoàn tất
          </LoadingButton>
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
