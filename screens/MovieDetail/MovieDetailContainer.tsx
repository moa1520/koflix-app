import React, { useState, useEffect } from "react";
import { moviesApi } from "../../api";
import MovieDetailPresenter from "./MovieDetailPresenter";

const MovieDetailContainer = ({
  route: {
    params: { id }
  }
}) => {
  const parsedId = parseInt(id);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const detailFetch = async () => {
    try {
      const { data: result } = await moviesApi.movieDetail(parsedId);
      setResult(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    detailFetch();
  }, [id]);

  return <MovieDetailPresenter loading={loading} data={result} />;
};

export default MovieDetailContainer;
