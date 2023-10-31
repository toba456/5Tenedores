import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/base";
import { onAuthStateChanged } from "firebase/auth";
import { auth, screen } from "../../../utils";
import { styles } from "./BtnReviewForm.styles";
import { useNavigation } from "@react-navigation/native";

export const BtnReviewForm = ({ idRestaurant }) => {
  const [hasLogged, setHasLogged] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restourants.addReviewRestaurant, {
      idRestaurant,
    });
  };
  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Escribe una opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Para escribir una opinión es necesario estar logeado pulsar{" "}
          <Text style={styles.textClick}>AQUÍ para iniciar sesión</Text>
        </Text>
      )}
    </View>
  );
};
