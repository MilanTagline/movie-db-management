"use client";
import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import bgImage from "../../public/assets/Vectors.png";
import Button from "@/shared/Button";
import { useRouter } from "next/navigation";

const EmptyMovieView = () => {
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
        <Button sx={{
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
        </Button>
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

export default EmptyMovieView;
