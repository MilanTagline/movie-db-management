import MovieList from "@/component/MovieList";
import EmptyMovieView from "@/component/EmptyMovieView";
import api from "@/utils/api";
import React from "react";


const Movies = async () => {
  const { data } = await api('get', 'movies', false)
  return data?.length ? <MovieList /> : <EmptyMovieView />;
};

export default Movies;
