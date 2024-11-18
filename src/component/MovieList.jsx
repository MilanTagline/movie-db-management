'use client'
import React from "react";
import { Box, TextField, Typography, Button, Checkbox, FormControlLabel } from "@mui/material";
import bgImage from '../../public/assets/Vectors.png'


const MovieList = () => {

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
         <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: 600, fontSize: "48px", marginBottom: "20px", textAlign: "center" }}
        >
          Your movie list is empty
        </Typography>
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
};

export default MovieList;
