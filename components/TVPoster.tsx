import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import constants from "../constants";

const View = styled.View`
  margin: 2px;
`;

const Text = styled.Text`
  color: white;
  font-size: 12px;
`;

const TVPoster = ({ poster_path, name }): any => {
  const realPath = "https://image.tmdb.org/t/p/w300" + poster_path;
  return (
    <View>
      <Image
        style={{
          width: constants.width / 3.3,
          height: constants.height / 4.3
        }}
        source={{ uri: realPath }}
        resizeMode="contain"
      />
      <Text> {name.length > 11 ? `${name.substring(0, 11)}...` : name}</Text>
    </View>
  );
};

export default TVPoster;
