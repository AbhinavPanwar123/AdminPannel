import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

const EmailVerification = ({
  setMessage,
  setError,
  setEmail,
  setResetToken,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/users/sendVerificationEmail",
          
        );
        setMessage(response.data.message);
        setEmail(values.email);
        setResetToken(response.data.resetToken);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        console.error("Error during email verification:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email Address"
        margin="normal"
        variant="outlined"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Verify Email
      </Button>
    </form>
  );
};

export default EmailVerification;
