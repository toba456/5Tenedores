import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/base";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./BtnReviewForm.styles";

export const BtnReviewForm = ({ idRestaurant }) => {
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length > 0) {
          setHasReview(true);
        }
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restourants.addReviewRestaurant, {
      idRestaurant,
    });
  };

  if (hasLogged && hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.textSenReview}>
          Ya has enviado un review a este restaurante
        </Text>
      </View>
    );
  }
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
