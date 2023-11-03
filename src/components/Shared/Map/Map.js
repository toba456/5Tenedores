import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Map.styles";
import MapView, { Marker } from "react-native-maps";

export const Map = ({ location, name }) => {
  return (
    <MapView style={styles.content} initialRegion={location}>
      <Marker coordinate={location} title={name} />
    </MapView>
  );
};
