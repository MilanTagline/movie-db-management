import React from "react";
import { AppBar, Toolbar, Typography, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import bgImage from "../../public/assets/Vectors.png";
import Plus from '../../public/assets/round-plus.svg';
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";



export default function MovieList({movies}) {
 
  return (
    <Box sx={{ backgroundColor: "#0a3644", position: 'relative', minHeight: "100vh", padding:{xs: '20px',md:'80px',lg:"120px"}, paddingBottom: {xs: '100px !important',md:'200px !important'}, color: "#FFFFFF" }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#0a3644", boxShadow: "none", padding: "0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 'unset !important' }}>
          <Typography variant="h6" color="white.main" sx={{ fontWeight: "bold", fontSize: "24px", display: 'flex', alignItems: 'center', gap: '15px' }}>
            My Movies
            <Link href="/movie/create" sx={{cursor: "pointer"}}>
            <Image src={Plus.src} height={20} width={20} alt="plus icon" />
            </Link>
          </Typography>
         <LogoutButton />
        </Toolbar>
      </AppBar>

      <Grid container spacing={4} sx={{ padding: "20px", justifyContent: "center" }}>
        {movies?.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: "#092C39", borderRadius: "12px" }}>
                <Box sx={{padding: '8px'}}>

              <CardMedia
                component="img"
                height="180"
                image={movie.poster}
                alt={movie.title}
                sx={{ borderRadius: "12px" }}
                />
                </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: "500", color: "white", lineHeight: "32px", color: 'white.main' }}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="white.main" lineHeight="24px">
                  {movie.publishingYear}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <Pagination
          count={2}
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#ffffff",
            },
          }}
        />
      </div> */}
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
