"use client";
import theme from "@/themes/theme";
import { Box, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Download from "../../public/assets/download.svg";
import bgImage from "../../public/assets/Vectors.png";
import Button from "@/shared/Button";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Addorupdatemovie(values) {
  const [fileError, setFileError] = useState(null);
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    year: Yup.string().required("Publish year is required"),
    file: Yup.string().required("Image is required")
  });

  const defaultValue = {
    title: "",
    year: "",
    file: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    values: values
      ? {
          title: values.title,
          year: values.year,
          file: values?.file
        }
      : defaultValue,
  });
  const onDrop = (acceptedFiles) => {
    setValue("file", acceptedFiles[0]);
    setFileError(null);
  };  

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        backgroundColor: "#0B2434",
        minHeight: "100vh",
        padding: { xs: "20px", md: "80px", lg: "120px" },
        paddingBottom: "200px !important",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          marginBottom: "120px",
          fontWeight: "bold",
          fontSize: "48px",
          lineHeight: "56px",
        }}
      >
        {Object.keys(values)?.length ? "Edit" : "Create a new movie"}
      </Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={{ md: "row" }}
          gap={{ xs: "30px", md: "75px", lg: "127px" }}
        >
          <Box
            {...getRootProps()}
            sx={{
              border: errors?.file?.message ? "2px dashed red" : "2px dashed #ffffff",
              borderRadius: "10px",
              width: { xs: "100%", md: "40%" },
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
            {!watch('file') && (
              <Image
                src={Download.src}
                height={20}
                width={20}
                alt="download icon"
              />
            )}
            {errors?.file?.message ? <Typography sx={{color: "red"}}>{errors?.file?.message}</Typography> : watch('file') ?  watch('file')?.name: "Drop an image here"}
          </Box>
          <Box>
            <TextField
              {...register("title")}
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
                  color: errors.title
                    ? `${theme.palette.primary.error}`
                    : "white.main", // Change color based on error
                },
              }}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              {...register("year")}
              label="Publishing year"
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
                  color: errors.year
                    ? `${theme.palette.primary.error}`
                    : "white.main", // Change color based on error
                },
              }}
              error={!!errors.year}
              helperText={errors.year?.message}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "64px",
                width: "100%",
                gap: "16px",
              }}
            >
              <Button
                variant="outlined"
                color="white.main"
                sx={{ width: "100%" }}
                onClick={() => router.push("/movie")}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>

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
}
