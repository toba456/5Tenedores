import React from "react";
import { View, Text } from "react-native";
import { styles } from "./NotFoundRestaurant.styles";
import { Icon } from "@rneui/base";

export const NotFoundRestaurant = () => {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>No tienes restaurantes en tu lista</Text>
    </View>
  );
};
