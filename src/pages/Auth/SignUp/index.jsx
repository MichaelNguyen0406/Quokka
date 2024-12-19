// Import Material UI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Import Lib
import { Link } from "react-router-dom";
import { useFormik } from "formik";

// Import file
import { signUpSchema } from "../../../Schemas/index.js";
import InputEmail from "../components/InputEmail.jsx";
import InputPassword from "../components/InputPassword.jsx";
import InputSubmit from "../components/InputSubmit.jsx";
import InputCheckBox from "../components/InputCheckBox.jsx";

// Auth
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth.js";

function SignUp() {
  // Auth

  // Validation form
  const onSubmit = () => {
    try {
      doCreateUserWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      isAgreed: false,
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

  return (
    <Card sx={{ width: 400, textAlign: "center", padding: 6 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Sign up
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Already have an account? <Link to="/login">Sign in here</Link>
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <InputEmail
          handleChange={handleChange}
          values={values.email}
          touched={touched.email}
          errors={errors.email}
        />
        <InputPassword
          handleChange={handleChange}
          value={values.password}
          touched={touched.password}
          error={errors.password}
        />
        <InputPassword
          handleChange={handleChange}
          value={values.passwordConfirm}
          touched={touched.passwordConfirm}
          error={errors.passwordConfirm}
          name="passwordConfirm"
          label="Password Confirm"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputCheckBox
            handleChange={handleChange}
            value={values.check}
            label="Keep me signed in"
          />
          <Link to="/forgot-password">Forgot password?</Link>
        </Box>
        <InputSubmit>Sign me up</InputSubmit>
      </Box>
      <Typography>©2024.All rights reserved</Typography>
    </Card>
  );
}

export default SignUp;
