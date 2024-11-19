"use client";
import CustomButton from "@/shared/CustomButton";
import CustomTypography from "@/shared/CustomTypography";
import theme from "@/themes/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import bgImage from "../../../../public/assets/Vectors.png";
import { useDispatch } from "react-redux";
import { login } from "@/redux/actions/authAction";

const LoginPage = () => {
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
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
    dispatch(login(data));
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
        <CustomTypography
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
        </CustomTypography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("email")}
            label="Email"
            variant="outlined"
            fullWidth
            sx={{
              input: {
                color: "white.main",
                bgcolor: "#224957",
                borderRadius: "10px",
                "&:-webkit-autofill": {
                  bgcolor: "#224957",
                  WebkitBoxShadow: "0 0 0px 1000px #224957 inset ",
                  color: '#fff !important'
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
                  : "white.main", // Change color based on error
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
              input: {
                color: "white.main",
                bgcolor: "#224957",
                borderRadius: "10px",
                "&:-webkit-autofill": {
                  bgcolor: "#224957",
                  WebkitBoxShadow: "0 0 0px 1000px #224957 inset ",
                  color: 'white.main !important'
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
                  : "white.main", // Change color based on error
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
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: "20px",
              padding: "10px",
            }}
          >
            Login
          </CustomButton>
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
