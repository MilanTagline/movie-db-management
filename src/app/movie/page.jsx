import AllMovies from "@/component/AllMovie";
import MovieList from "@/component/EmptyMovie";
import api from "@/utils/api";
import React from "react";


const Movies = async () => {
  const { data } = await api('get', 'movies', false)
  console.log(data)
  return data?.length ? <AllMovies /> : <MovieList />;
};

export default Movies;
