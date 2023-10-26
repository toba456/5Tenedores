import React, { useEffect, useState } from "react";
import { Modal } from "../../../Shared";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./MapForm.styles";

export const MapForm = ({ show, close }) => {
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Tienes que ir a ajustes de la app y activar la localización",
          visibilityTime: 4000,
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);
  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          initialRegion={location}
          showsUserLocation={true}
          style={styles.mapStyles}
          onRegionChange={(locationTemp) => setLocation(locationTemp)}
        >
          <Marker draggable coordinate={location} />
        </MapView>
      </View>
    </Modal>
  );
};
