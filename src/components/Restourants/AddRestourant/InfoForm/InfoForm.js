import React from "react";
import { View } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input } from "@rneui/base";

export const InfoForm = () => {
  return (
    <View style={styles.content}>
      <Input placeholder="Nombre del restourant" />
      <Input placeholder="Dirección" />
      <Input
        placeholder="Descripción del restourant"
        multiline={true}
        inputContainerStyle={styles.textArea}
      />
    </View>
  );
};
