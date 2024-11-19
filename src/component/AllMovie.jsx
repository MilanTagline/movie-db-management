// pages/index.js
import React from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardMedia, CardContent, Button, Pagination, Box } from "@mui/material";
import bgImage from "../../public/assets/Vectors.png";
import CardImage from "../../public/assets/card-image.png";
import Plus from '../../public/assets/round-plus.svg';
import Logout from '../../public/assets/logout.svg';
import Image from "next/image";


export default function AllMovies() {
  const movies = Array(12).fill({ title: "Movie 1", year: 2021, image: CardImage.src }); // Example data

  return (
    <Box sx={{ backgroundColor: "#0a3644", position: 'relative', minHeight: "100vh", padding:{xs: '20px',md:'80px',lg:"120px"}, paddingBottom: {xs: '100px',md:'200px'}, color: "#FFFFFF" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#0a3644", boxShadow: "none", padding: "0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 'unset !important' }}>
          <Typography variant="h6" color="white.main" sx={{ fontWeight: "bold", fontSize: "24px", display: 'flex', alignItems: 'center', gap: '15px' }}>
            My Movies
            <Image src={Plus.src} height={20} width={20} alt="plus icon" />
          </Typography>
          <Button sx={{ color: "#ffffff", textTransform: "none", fontWeight: "bold", gap: '10px' }}>Logout  <Image  alt="logout icon" src={Logout.src} height={20} width={20} /></Button>
        </Toolbar>
      </AppBar>

      {/* Movie Grid */}
      <Grid container spacing={4} sx={{ padding: "20px", justifyContent: "center" }}>
        {movies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: "#092C39", borderRadius: "12px" }}>
                <Box sx={{padding: '8px'}}>

              <CardMedia
                component="img"
                height="180"
                image={movie.image}
                alt={movie.title}
                sx={{ borderRadius: "12px" }}
                />
                </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: "500", color: "white", lineHeight: "32px", color: 'white.main' }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="white.main" lineHeight="24px">
                  {movie.year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <Pagination
          count={2} // Example pagination count
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#ffffff",
            },
          }}
        />
      </div>
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
