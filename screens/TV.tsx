import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Text = styled.Text`
  color: white;
`;

function TV() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(20,20,20,1)"
      }}
    >
      <Text>TV</Text>
    </View>
  );
}

export default TV;
