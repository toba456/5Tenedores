import React from "react";
import { View } from "react-native";
import { Text, Rating, AirbnbRating } from "@rneui/base";
import { styles } from "./Header.styles";

export const Header = ({ restaurant }) => {
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant?.name}</Text>
        <AirbnbRating
          size={20}
          defaultRating={restaurant.ratingMedia || 0}
          isDisabled
          showRating={false}
        />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
};
