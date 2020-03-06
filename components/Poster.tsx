import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { withNavigation } from "@react-navigation/compat";
import styled from "styled-components";
import constants from "../constants";

const View = styled.View`
  margin: 2px;
`;

const Text = styled.Text`
  color: white;
  font-size: 12px;
`;

const Poster = ({ id, poster_path, title, navigation }) => {
  const realPath = "https://image.tmdb.org/t/p/w300" + poster_path;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Detail", {
          title,
          id
        })
      }
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
        <Text>
          {title.length > 11 ? `${title.substring(0, 11)}...` : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(Poster);
