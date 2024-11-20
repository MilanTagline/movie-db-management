import React from "react";
import { Box, CircularProgress } from "@mui/material";
import Typography from "@/shared/Typography";

const MovieLoader = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0a3644",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "white", mb: 2 }} />
      <Typography variant="h6" color="white">
        Loading...
      </Typography>
    </Box>
  );
};

export default MovieLoader;