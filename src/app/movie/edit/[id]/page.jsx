import Addorupdatemovie from "@/component/Addorupdatemovie";
import api from "@/utils/api";
import React from "react";

const EditMovies = async ({ id }) => {
  const { data } = await api("get", `movies/${id}`, false);
  return <Addorupdatemovie values={data} />;
};

export default EditMovies;
