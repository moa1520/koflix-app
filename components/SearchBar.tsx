import React from "react";
import constants from "../constants";
import { TextInput } from "react-native";

const SearchBar = ({ value, onChangeText, onSubmit }) => (
  <TextInput
    style={{
      width: constants.width - 40,
      height: 35,
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
      backgroundColor: "rgb(40, 40, 40)",
      color: "white"
    }}
    returnKeyType="search"
    value={value}
    onChangeText={onChangeText}
    placeholder={"검색"}
    placeholderTextColor="rgb(200, 200, 200)"
    onEndEditing={onSubmit}
  />
);

export default SearchBar;
