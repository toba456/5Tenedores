import React, { useState } from "react";
import { View } from "react-native";
import { auth, screen } from "../../../utils";
import { Icon } from "@rneui/base";
import { styles } from "./RestaurantsScreen.styles";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const RestaurantsScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <View style={styles.content}>
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
