import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input } from "@rneui/base";
import { MapForm } from "../MapForm";

export const InfoForm = ({ formik }) => {
  const [showMap, setShowMap] = useState(false);

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restourante"
          onChangeText={(text) => formik.setFieldValue("name", text.trim())}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Dirección"
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            color: getColorIconMap(formik),
            onPress: onOpenCloseMap,
          }}
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
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
};

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";
  if (formik.values.location) return "#00a680";
  return "#c2c2c2";
};
