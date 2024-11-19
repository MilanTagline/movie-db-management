"use client";
import theme from "@/themes/theme";
import { Box, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Download from "../../public/assets/download.svg";
import bgImage from "../../public/assets/Vectors.png";
import CustomButton from "@/shared/CustomButton";

export default function Addorupdatemovie() {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        backgroundColor: "#0B2434",
        minHeight: "100vh",
        padding:{xs: '20px',md:'80px',lg:"120px"},
        paddingBottom: "200px !important",
        position: 'relative'
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#fff", marginBottom: "120px", fontWeight: "bold", fontSize: '48px', lineHeight:"56px" }}
      >
        Create a new movie
      </Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={{md:"row"}} gap={{xs:"30px",md:"75px",lg:"127px"}}>
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ffffff",
              borderRadius: "10px",
              width: {xs: '100%',md:"40%"},
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              color: "#ffffff",
              cursor: "pointer",
              backgroundColor: theme.palette.input.main,
            }}
          >
            <input {...getInputProps()} />
            <Image src={Download.src} height={20} width={20} alt="download icon" />
            <Typography>Drop an image here</Typography>
          </Box>
          <Box>
            <TextField
              {...register("Title")}
              label="Title"
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
                    : "white.main", // Change color based on error
                },
              }}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("Publishing year")}
              label="Publishing year"
              type="text"
              variant="outlined"
              fullWidth
              sx={{
                "&.MuiFormControl-root": {
                  marginTop: "20px",
                },
                input: {
                  color: "white.main",
                  bgcolor: "#224957",
                  borderRadius: "10px",
                  "&:-webkit-autofill": {
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
                    : "white.main", // Change color based on error
                },
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "64px",
                width: '100%',
                gap: '16px'
              }}
            >
              <CustomButton
                variant="outlined"
                color="white.main"
                sx={{ width: "100%" }}
              >
                Cancel
              </CustomButton>
              <CustomButton variant="contained" sx={{ width: "100%" }}>
                Submit
              </CustomButton>
            </Box>
          </Box>
        </Stack>
      </form>

      <Box
        component="img"
        src={bgImage.src} // Replace with the actual path to your wave image
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
}
