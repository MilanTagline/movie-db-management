"use client";
import Button from "@/shared/Button";
import Typography from "@/shared/Typography";
import theme from "@/themes/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import bgImage from "../../../../public/assets/Vectors.png";
import { useDispatch } from "react-redux";
import { login } from "@/redux/actions/authAction";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    values: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const rememberMe = watch("rememberMe");

  useEffect(() => {
    const email = Cookies.get("email");
    const password = Cookies.get("password");
    if (email && password) {
      setValue("email", email);
      setValue("password", password);
      setValue("rememberMe", true);
    }
  }, []);

  const onSubmit = (data) => {
    if (data?.rememberMe) {
      Cookies.set("email", data.email);
      Cookies.set("password", data.password);
    }
    dispatch(login(data, router));
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
          sx={{
            color: "white.main",
            fontWeight: 600,
            fontSize: "64px",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("email")}
            placeholder="Email"
            fullWidth
            autoComplete="off"
            sx={{
              "& .MuiInputBase-root": {
                overflow: "hidden",
                borderRadius: "10px",
              },
              input: {
                color: "white.main",
                bgcolor: "#224957",
                "&:-webkit-autofill": {
                  bgcolor: "#224957",
                  WebkitBoxShadow: "0 0 0px 1000px #224957 inset ",
                  WebkitTextFillColor: "white !important",
                  color: "#fff !important",
                },
              },
              label: { color: "white.main" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "none" },
                "&:hover fieldset": { borderColor: "#6ee7b7" },
                "&.Mui-focused fieldset": { borderColor: "#6ee7b7" },
              },
              "& .MuiFormHelperText-root": {
                color: errors.email
                  ? `${theme.palette.primary.error}`
                  : "white.main",
              },
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password")}
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                overflow: "hidden",
                borderRadius: "10px",
              },
              input: {
                color: "white.main",
                bgcolor: "#224957",
                "&:-webkit-autofill": {
                  bgcolor: "#224957",
                  WebkitBoxShadow: "0 0 0px 1000px #224957 inset ",
                  WebkitTextFillColor: "white !important",
                  color: "white.main !important",
                },
                "&:-webkit-autofill-selected": {
                  bgcolor: "#224957",
                  WebkitBoxShadow: "0 0 0px 1000px #224957 inset ",
                  color: "white.main !important",
                },
              },
              label: { color: "white.main" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "none" },
                "&:hover fieldset": { borderColor: "#6ee7b7" },
                "&.Mui-focused fieldset": { borderColor: "#6ee7b7" },
              },
              "& .MuiFormHelperText-root": {
                color: errors.password
                  ? `${theme.palette.primary.error}`
                  : "white.main",
              },
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register("rememberMe")}
                checked={rememberMe}
                sx={{
                  color: "#224957",
                  "&.Mui-checked": { color: "#6ee7b7" },
                }}
              />
            }
            label="Remember me"
            sx={{
              color: "white.main",
              fontWeight: "400",
              fontSize: "14px",
              width: "100%",
              justifyContent: "center",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
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
