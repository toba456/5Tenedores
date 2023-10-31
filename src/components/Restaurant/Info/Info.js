import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "@rneui/base";
import { styles } from "./Info.styles";
import { Map } from "../../Shared";

export const Info = ({ restaurant }) => {
  const listInfo = [
    {
      text: restaurant.address,
      iconType: "material-community",
      iconName: "map-marker",
    },
    {
      text: restaurant.phone,
      iconType: "material-community",
      iconName: "phone",
    },
    {
      text: restaurant.email,
      iconType: "material-community",
      iconName: "at",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el restaurante</Text>
      <Map location={restaurant.location} name={restaurant.name} />
      {listInfo.map((item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
