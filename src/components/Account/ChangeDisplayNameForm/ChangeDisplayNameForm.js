import { Button, Input } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import { styles } from "./ChangeDisplayNameForm.styles";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import { initialValues, validationSchema } from "./ChangeDisplayNameForm.data";
import Toast from "react-native-toast-message";
import { capitalizeWords } from "../../../utils/regularExpressions";

export const ChangeDisplayNameForm = ({ onClose, onReload }) => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const { displayName } = formValue;
        const currentUser = auth.currentUser;

        await updateProfile(currentUser, {
          displayName: capitalizeWords(displayName),
        });

        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error a cambiar el nombre y apellidos",
        });
      }
    },
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) =>
          formik.setFieldValue("displayName", text.trim())
        }
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
