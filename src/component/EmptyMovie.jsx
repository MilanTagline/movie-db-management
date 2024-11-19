"use client";
import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import bgImage from "../../public/assets/Vectors.png";
import CustomButton from "@/shared/CustomButton";
import { redirect, useRouter } from "next/navigation";

const MovieList = () => {
  const router = useRouter()
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
      <Box component={"div"}>
        <Typography
          variant="h4"
          sx={{
            color: "white.main",
            fontWeight: 600,
            fontSize: "48px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Your movie list is empty
        </Typography>
        <CustomButton sx={{
          backgroundColor: "#2BD17E",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "10px",
          textTransform: "none",
          display: 'block',
          margin: '0 auto'
        }}
        onClick={() => router.push('/movie/create')}
        >
          Add a new movie
        </CustomButton>
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

export default MovieList;
