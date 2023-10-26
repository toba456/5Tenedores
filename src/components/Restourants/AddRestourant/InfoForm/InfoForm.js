import React from "react";
import { View } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input } from "@rneui/base";

export const InfoForm = ({ formik }) => {
  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre del restourante"
        onChangeText={(text) => formik.setFieldValue("name", text.trim())}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => formik.setFieldValue("address", text.trim())}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Teléfono"
        onChangeText={(text) => formik.setFieldValue("phone", text.trim())}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Email"
        onChangeText={(text) => formik.setFieldValue("email", text.trim())}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Descripción del restourante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={(text) =>
          formik.setFieldValue("description", text.trim())
        }
        errorMessage={formik.errors.description}
      />
    </View>
  );
};
