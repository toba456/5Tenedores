import { Text, Image } from "@rneui/base";
import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./LoginScreen.styles";
import { screen } from "../../../utils";
import { LoginForm } from "../../../components/Auth/LoginForm/LoginForm";

export const LoginScreen = ({ navigation }) => {
  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  };
  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={goToRegister}>
            Registrarse
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
