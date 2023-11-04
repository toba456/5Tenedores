import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AirbnbRating, Icon, Image, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./RestaurantRanking.styles";

export const RestaurantRanking = ({ restaurant, index }) => {
  const navigation = useNavigation();

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";

    if (index == 0) color = "#ffd700";
    if (index == 1) color = "#bebebe";
    if (index == 2) color = "#cd7f32";
    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  const goToRestaurant = () =>
    navigation.navigate(screen.restourants.tab, {
      screen: screen.restourants.restaurant,
      params: { id: restaurant.id },
    });
  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>
          <AirbnbRating
            size={15}
            isDisabled
            defaultRating={restaurant.ratingMedia}
            showRating={false}
          />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
