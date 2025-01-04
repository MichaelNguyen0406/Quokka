// Import Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

// Import Lib
import { NavLink } from "react-router-dom";
import { useState } from "react";

// Import file
import InputEmail from "../components/InputEmail.jsx";
import InputPassword from "../components/InputPassword.jsx";
import InputNext from "../components/inputNext.jsx";
import InputSubmit from "../components/InputSubmit.jsx";
import LoginWithGoogleButton from "../components/LoginWithGoogleButton.jsx";
import checkEmail from "../../../helper/checkEmail.js";
import StatusPassword from "./components/StatusPassword.jsx";
import checkPassword from "../../../helper/checkPassword.js";

// Auth
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth.js";
import { updateProfile } from "firebase/auth";
import { addDocumentId } from "../../../firebase/service.js";

function SignUp() {
  document.title = "Đăng ký - Quokka";

  // State SignUp Handle
  const [loading, setLoading] = useState(false);
  const [nextEmail, setNextEmail] = useState(false);
  const [prevPassword, setPrevPassword] = useState(true);

  // State Email Handle
  const [valueEmail, setValueEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const handleChangeEmail = (e) => {
    setValueEmail(e.target.value);
    setErrorEmail(false);
  };

  // State Password Handle
  const [valuePassword, setValuePassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const handleChangePassword = (e) => {
    setValuePassword(e.target.value);
    setErrorPassword(false);
  };

  // Submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword(valuePassword)) {
      setLoading(true);
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(
          valueEmail,
          valuePassword
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: user.email.split("@")[0],
        });
        const dataUser = {
          newUser: true,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          listPost: [],
          listComment: [],
          listLike: [],
          listBookmark: [],
          listFriend: [],
        };
        await addDocumentId("users", dataUser, user.uid);
      } catch (error) {
        console.log("Error sign up: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorPassword(true);
    }
  };

  // ....
  const handleNext = () => {
    if (!checkEmail(valueEmail)) {
      setErrorEmail(true);
    } else {
      setNextEmail(true);
      setPrevPassword(false);
    }
  };

  const handleBack = () => {
    setNextEmail(false);
    setPrevPassword(true);
  };

  return (
    <Box sx={{ width: "320px", textAlign: "center", padding: 5 }}>
      <Box mb={12.5}>
        <img
          style={{
            width: "80px",
            height: "auto",
          }}
          src="https://res.cloudinary.com/dohadwixt/image/upload/v1735587953/aOHHsQACSf645PnYWA2AeQ_dg4lpg-removebg-preview_2_vmhuxh.png"
        />
      </Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, color: "#2d333a" }}
      >
        Tạo một tài khoản
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <InputEmail
          handleChange={handleChangeEmail}
          values={valueEmail}
          error={errorEmail}
          disabled={nextEmail}
        />
        {nextEmail && (
          <InputPassword
            handleChange={handleChangePassword}
            values={valuePassword}
          />
        )}
        {!errorPassword && valuePassword.length > 0 && (
          <StatusPassword value={valuePassword} />
        )}
        {errorPassword && (
          <Box mb={2.5}>
            <Alert variant="outlined" severity="error">
              Mật khẩu của bạn chưa hợp lệ.
            </Alert>
          </Box>
        )}
        {nextEmail ? (
          <InputSubmit loading={loading}>Đăng ký</InputSubmit>
        ) : (
          <InputNext onClick={handleNext}>Tiếp tục</InputNext>
        )}
      </Box>
      {/* <Box
        sx={{ my: 3, backgroundColor: "#f0f8ff", padding: 2, borderRadius: 1 }}
      >
        <Typography variant="body2" color="primary">
          Chúng tôi đã gửi email xác minh đến địa chỉ của bạn. Vui lòng kiểm tra
          hộp thư để hoàn tất đăng ký.
        </Typography>
      </Box> */}
      {prevPassword ? (
        <Typography mb={4}>
          Đã có tài khoản?
          <NavLink
            to="/login"
            style={{
              textDecoration: "none",
              marginBottom: "20px",
            }}
          >
            <Typography
              component="span"
              ml={0.8}
              color="primary"
              display="inline"
            >
              Đăng nhập
            </Typography>
          </NavLink>
        </Typography>
      ) : (
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
      )}
      {prevPassword && (
        <>
          <Box sx={{ position: "relative", mb: 4 }}>
            <Typography
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                p: "1rem",
                fontSize: "13px",
                color: "#2d333a",
              }}
            >
              HOẶC
            </Typography>
            <hr />
          </Box>
          <LoginWithGoogleButton />
        </>
      )}
    </Box>
  );
}

export default SignUp;
