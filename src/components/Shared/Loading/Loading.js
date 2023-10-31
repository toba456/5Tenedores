import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./Loading.styles";
import { Text } from "@rneui/base";

export const Loading = ({ show, text }) => {
  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#00a680" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};
