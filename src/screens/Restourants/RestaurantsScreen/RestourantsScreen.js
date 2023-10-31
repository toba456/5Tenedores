import React, { useState } from "react";
import { View } from "react-native";
import { auth, db, screen } from "../../../utils";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurants } from "../../../components";
import { Icon, Text } from "@rneui/base";
import { styles } from "./RestaurantsScreen.styles";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const RestaurantsScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "restourants"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}
      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color={"#00a680"}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate(screen.restourants.addRestourant)}
        />
      )}
    </View>
  );
};
