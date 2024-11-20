import Addorupdatemovie from "@/component/Addorupdatemovie";
import { cookies } from "next/headers";
import React from "react";

async function fetchMovies(id) {
  const token = (await cookies()).get("token");
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/movies?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const res = await data.json();
  return res;
}

const EditMovies = async ({ params }) => {
  const data = await fetchMovies((await params).id);

  return <Addorupdatemovie movie={data?.data} />;
};

export default EditMovies;
