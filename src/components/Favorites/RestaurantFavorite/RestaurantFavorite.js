import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { Tile } from "@rneui/base";
import { deleteDoc, doc } from "firebase/firestore";
import { styles } from "./RestaurantFavorite.styles";

export const RestaurantFavorite = ({ restaurant }) => {
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate(screen.restourants.tab, {
      screen: screen.restourants.restaurant,
      params: {
        id: restaurant.id,
      },
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      <Tile
        imageSrc={{
          uri: restaurant.images[0],
        }}
        title={restaurant.name}
        titleStyle={styles.title}
        activeOpacity={1}
        onPress={goToRestaurant}
        height={240}
        containerStyle={{ width: "100%" }}
        contentContainerStyle={styles.titleContainer}
        icon={{
          type: "material-community",
          name: "heart",
          size: 80,
          color: "#f00",
          onPress: onRemoveFavorite,
        }}
      />
    </View>
  );
};
