// Import Material UI
import Card from "@mui/material/Card";
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
import InputCheckBox from "../components/InputCheckBox.jsx";

// Auth
import { doSignInWithEmailAndPassword } from "../../../firebase/auth.js";

function SignIn() {
  // Authentication
  const onSubmit = (data) => {
    doSignInWithEmailAndPassword(data.email, data.password);
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
    <Card sx={{ width: 400, textAlign: "center", padding: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Sign in
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Don&apos;t have an account?{" "}
        <NavLink style={{ textDecoration: "none" }} to="/sign-up">
          Click here to sign up
        </NavLink>
      </Typography>
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
            my: 1,
          }}
        >
          <InputCheckBox
            handleChange={handleChange}
            label="Remember me?"
            value={values.isAgreed}
          />
          <NavLink style={{ textDecoration: "none" }} to="/forgot-password">
            Forgot password?
          </NavLink>
        </Box>
        <InputSubmit>Login</InputSubmit>
      </Box>
      <Typography>©2024.All rights reserved</Typography>
    </Card>
  );
}

export default SignIn;
