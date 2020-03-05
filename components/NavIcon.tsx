import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NavIcon = ({ focused = true, name, color = "white", size = 26 }) => (
  <Ionicons name={name} color={focused ? color : "grey"} size={size} />
);

export default NavIcon;
