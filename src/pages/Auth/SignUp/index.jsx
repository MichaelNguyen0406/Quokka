// Import Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Import Lib
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

// Import file
import { signUpSchema } from "../../../Schemas/index.js";
import InputEmail from "../components/InputEmail.jsx";
import InputPassword from "../components/InputPassword.jsx";
import InputSubmit from "../components/InputSubmit.jsx";
import InputDisplayName from "../components/InputDisplayName.jsx";

// Auth
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth.js";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { addDocumentId } from "../../../firebase/service.js";

function SignUp() {
  document.title = "Đăng ký - Quokka";

  const [loading, setLoading] = useState(false);
  // Validation form
  const onSubmit = async () => {
    setLoading(true);
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(
        values.email,
        values.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: values.displayName,
      });

      const dataUser = {
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
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isAgreed: false,
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

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
        Đăng ký
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <InputDisplayName
          handleChange={handleChange}
          values={values.displayName}
          touched={touched.displayName}
          error={errors.displayName}
        />
        <InputEmail
          handleChange={handleChange}
          values={values.email}
          touched={touched.email}
          error={errors.email}
        />
        <InputPassword
          handleChange={handleChange}
          value={values.password}
          touched={touched.password}
          error={errors.password}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink
            style={{ textDecoration: "none", marginBottom: "20px" }}
            to="/forgot-password"
          >
            <Typography color="primary">Quên mật khẩu?</Typography>
          </NavLink>
        </Box>
        <InputSubmit loading={loading}>Đăng ký</InputSubmit>
      </Box>
      {/* <Box
        sx={{ my: 3, backgroundColor: "#f0f8ff", padding: 2, borderRadius: 1 }}
      >
        <Typography variant="body2" color="primary">
          Chúng tôi đã gửi email xác minh đến địa chỉ của bạn. Vui lòng kiểm tra
          hộp thư để hoàn tất đăng ký.
        </Typography>
      </Box> */}
      <Typography>
        Đã có tài khoản?
        <NavLink
          to="/login"
          style={{
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          <Typography ml={0.8} color="primary" display="inline">
            Đăng nhập
          </Typography>
        </NavLink>
      </Typography>
    </Box>
  );
}

export default SignUp;
