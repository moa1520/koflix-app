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

const Poster = ({ poster_path, title }): any => {
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
      <Text> {title.length > 11 ? `${title.substring(0, 11)}...` : title}</Text>
    </View>
  );
};

export default Poster;
