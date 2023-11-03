import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./UserNotLogged.styles";
import { Button, Icon } from "@rneui/base";

export const UserNotLogged = () => {
  const navigation = useNavigation();

  const goToLogin = () =>
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.info}>
        Necesitas estar loggueado para ver esta sección
      </Text>
      <Button
        title="Ir al Login"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={goToLogin}
      />
    </View>
  );
};
