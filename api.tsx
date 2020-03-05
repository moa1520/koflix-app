import axios from "axios";

const API_KEY = "803b005f53021a61c58a9a205576b6f5";
const LANGUAGE = "ko";

const api = axios.create({ baseURL: "https://api.themoviedb.org/3" });

export const moviesApi = {
  nowPlaying: () =>
    api.get("/movie/now_playing", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    }),
  upcoming: () =>
    api.get("/movie/upcoming", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    }),
  popular: () =>
    api.get("/movie/popular", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    }),
  movieDetail: id =>
    api.get(`/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        append_to_response: "videos"
      }
    }),
  search: query =>
    api.get("/search/movie", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        query: query
      }
    })
};

export const tvApi = {
  topRated: () =>
    api.get("/tv/top_rated", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    }),
  popular: () =>
    api.get("/tv/popular", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    }),
  airingToday: () =>
    api.get("/tv/airing_today", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    }),
  tvDetail: id =>
    api.get(`/tv/${id}`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        append_to_response: "videos"
      }
    }),
  search: query =>
    api.get("/search/tv", {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        query: query
      }
    })
};

export const collectionApi = {
  getCollection: id =>
    api.get(`/collection/${id}`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    })
};
