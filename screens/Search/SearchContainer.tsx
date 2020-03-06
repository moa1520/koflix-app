import React, { Component, useState } from "react";
import SearchPresenter from "./SearchPresenter";
import SearchBar from "../../components/SearchBar";
import { BACKGROUND_COLOR } from "../../styles";
import { moviesApi, tvApi } from "../../api";
import { Alert } from "react-native";

const SearchContainer = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [movieResults, setMovieResults] = useState();
  const [tvResults, setTvResults] = useState();
  const onChangeText = (text: string) => {
    setValue(text);
  };
  const onSubmit = async () => {
    if (value === "" || value.length < 2) {
      Alert.alert("검색어를 2글자 이상 입력해주세요 ^-^");
      return;
    }
    try {
      setLoading(true);
      const {
        data: { results: movieResults }
      } = await moviesApi.search(value);
      const {
        data: { results: tvResults }
      } = await tvApi.search(value);

      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        value={value}
        onChangeText={onChangeText}
        onSubmit={onSubmit}
      />
    ),
    headerStyle: {
      backgroundColor: BACKGROUND_COLOR,
      shadowColor: "transparent"
    }
  });

  return (
    <SearchPresenter
      loading={loading}
      movieResults={movieResults}
      tvResults={tvResults}
    />
  );
};

export default SearchContainer;
