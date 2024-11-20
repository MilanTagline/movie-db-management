import MovieList from "@/component/MovieList";
import EmptyMovieView from "@/component/EmptyMovieView";
import React from "react";
import { cookies } from "next/headers";

async function fetchMovies() {
  const token = (await cookies()).get("token");
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL}api/movies`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const res = await data.json();
  return res;
}

const Movies = async () => {
  const data = await fetchMovies();
  return data?.data?.length ? (
    <MovieList movies={data?.data} />
  ) : (
    <EmptyMovieView />
  );
};

export default Movies;
