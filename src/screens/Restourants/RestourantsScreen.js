import React from "react";
import { Button, Text, View } from "react-native";
import { screen } from "../../utils";

export const RestaurantsScreen = ({ navigation }) => {
  return (
    <View>
      <Text> Esto es el Restaurant</Text>
      <Button
        title="Add new Restourant"
        onPress={() =>
          navigation.navigate(screen.account.tab, {
            screen: screen.account.account,
          })
        }
      />
    </View>
  );
};
