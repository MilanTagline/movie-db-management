'use client'
import React from "react";
import { Box, TextField, Typography, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import bgImage from '../../../../public/assets/Vectors.png'
import * as Yup from "yup";

const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0a3644",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0a3644",
          padding: "40px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: 600, fontSize: "64px", marginBottom: "20px", textAlign: "center" }}
        >
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              input: { color: "white" },
              label: { color: "#9ca3af" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#9ca3af" },
                "&:hover fieldset": { borderColor: "#6ee7b7" },
                "&.Mui-focused fieldset": { borderColor: "#6ee7b7" },
              },
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              input: { color: "white" },
              label: { color: "#9ca3af" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#9ca3af" },
                "&:hover fieldset": { borderColor: "#6ee7b7" },
                "&.Mui-focused fieldset": { borderColor: "#6ee7b7" },
              },
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("rememberMe")}
                sx={{
                  color: "#6ee7b7",
                  "&.Mui-checked": { color: "#6ee7b7" },
                }}
              />
            }
            label="Remember me"
            sx={{ color: "#9ca3af" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#10b981",
              "&:hover": { backgroundColor: "#059669" },
              marginTop: "20px",
              padding: "10px",
            }}
          >
            Login
          </Button>
        </form>
      </Box>
      <Box
        component="img"
        src={bgImage.src} 
        alt="Wave Background"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default LoginPage;
