// Import Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Import Lib
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

// Import file
import { signInSchema } from "../../../Schemas/index.js";
import InputEmail from "../components/InputEmail.jsx";
import InputPassword from "../components/InputPassword.jsx";
import InputSubmit from "../components/InputSubmit.jsx";
import LoginWithGoogleButton from "../components/LoginWithGoogleButton.jsx";

// Auth
import { doSignInWithEmailAndPassword } from "../../../firebase/auth.js";
import { useState } from "react";

function SignIn() {
  document.title = "Đăng nhập - Quokka";
  const [loading, setLoading] = useState(false);

  // Authentication
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await doSignInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          console.log(error.message);
          errors.email = "User does not exist";
          values.password = "";
          break;
        case "auth/wrong-password":
          console.log(error.message);
          errors.password = "Password is incorrect";
          values.password = "";
          break;
        default:
          console.error("Lỗi không xác định:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  // console.log(auth.currentUser);

  // Validation form
  const { handleSubmit, errors, touched, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
      isAgreed: false,
    },
    validationSchema: signInSchema,
    onSubmit,
  });

  // Submit

  return (
    <Box sx={{ width: "320px", textAlign: "center", padding: 5 }}>
      <Box mb={4}>
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
        Đăng nhập
      </Typography>

      {/* <Typography>
        Don&apos;t have an account?{" "}
        <NavLink style={{ textDecoration: "none" }} to="/sign-up">
          Click here to sign up
        </NavLink>
      </Typography> */}
      <Box component="form" onSubmit={handleSubmit}>
        <InputEmail
          handleChange={handleChange}
          error={errors.email}
          touched={touched.email}
          value={values.email}
        />
        <InputPassword
          handleChange={handleChange}
          error={errors.password}
          value={values.password}
          touched={touched.password}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 0,
          }}
        >
          <NavLink
            style={{ textDecoration: "none", marginBottom: "20px" }}
            to="/forgot-password"
          >
            <Typography color="primary">Quên mật khẩu?</Typography>
          </NavLink>
        </Box>
        <InputSubmit loading={loading}>Đăng nhập</InputSubmit>
      </Box>
      <Typography mb={4}>
        Không có tài khoản?
        <NavLink
          to="/sign-up"
          style={{
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          <Typography ml={0.8} color="primary" display="inline">
            Đăng ký
          </Typography>
        </NavLink>
      </Typography>
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
    </Box>
  );
}

export default SignIn;
