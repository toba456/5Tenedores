import React from "react";
import { Text, Image, Button } from "@rneui/base";
import { ScrollView } from "react-native";
import { styles } from "./UserGuestScreen.styles";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export const UserGuestScreen = (props) => {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };
  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil de restourant</Text>
      <Text style={styles.description}>
        ¿Cómo describirias tu mejor restourante? Busca y visualiza los mejores
        restourantes de una forma sencilla, vota cual te ha gustado mas y
        comenta como ha sido tu experiencia
      </Text>
      <Button
        title="Comenzar"
        buttonStyle={styles.btnStyles}
        onPress={goToLogin}
      />
    </ScrollView>
  );
};
