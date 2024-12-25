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
import InputDisplayName from "../components/InputDisplayName.jsx";

// Auth
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth.js";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { addDocumentId } from "../../../firebase/service.js";

function SignUp() {
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
    <Card sx={{ width: 300, textAlign: "center", padding: 4 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Sign up
      </Typography>
      <Typography>
        Already have an account? <Link to="/login">Sign in here</Link>
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
        <InputSubmit loading={loading}>Sign me up</InputSubmit>
      </Box>
      <Typography>©2024.All rights reserved</Typography>
    </Card>
  );
}

export default SignUp;
