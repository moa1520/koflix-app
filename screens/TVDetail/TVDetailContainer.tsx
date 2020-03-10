import React, { useState, useEffect } from "react";
import TVDetailPresenter from "./TVDetailPresenter";
import { tvApi } from "../../api";

const TVDetailContainer = ({
  route: {
    params: { id }
  }
}) => {
  const parsedId = parseInt(id);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const detailFetch = async () => {
    try {
      const { data: result } = await tvApi.tvDetail(parsedId);
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

  return <TVDetailPresenter loading={loading} data={result} />;
};

export default TVDetailContainer;
