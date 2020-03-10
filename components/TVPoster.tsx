import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import { withNavigation } from "@react-navigation/compat";

const View = styled.View`
  margin: 2px;
`;

const Text = styled.Text`
  color: white;
  font-size: 12px;
`;

const TVPoster = ({ id, poster_path, name, navigation }): any => {
  const realPath = "https://image.tmdb.org/t/p/w300" + poster_path;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TVDetail", { id, name })}
    >
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
    </TouchableOpacity>
  );
};

export default withNavigation(TVPoster);
