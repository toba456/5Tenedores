import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "./ListRestaurants.styles";
import { Image, Text } from "@rneui/base";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export const ListRestaurants = ({ restaurants }) => {
  const navigation = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restourants.restaurant, { id: restaurant.id });
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={(doc) => {
        const restaurant = doc.item.data();

        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.restaurants}>
              <Image
                source={{ uri: restaurant.images[0] }}
                style={styles.image}
              />
              <View>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.info}>{restaurant.address}</Text>
                <Text style={styles.info}>{restaurant.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
