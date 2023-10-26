import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { styles } from "./ChangeEmailForm.styles";
import { View } from "react-native";
import { useFormik } from "formik";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  signOut,
} from "firebase/auth";
import { initialValues, validationSchema } from "./ChangeEmailForm.data";
import Toast from "react-native-toast-message";
import { auth } from "../../../utils";

export const ChangeEmailForm = ({ onReload, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const firebaseEmailReset = async (user, email) => {
    try {
      await verifyBeforeUpdateEmail(user, email);
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = auth.currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );

        await firebaseEmailReset(currentUser, formValue.email);
        await reauthenticateWithCredential(currentUser, credentials);

        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Verificar correo electronico",
          visibilityTime: 4000,
        });

        onReload();
        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error al cambiar el email",
          position: "bottom",
        });
      }
    },
  });
  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo Email"
        style={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("email", text.trim())}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showHiddenPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text.trim())}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
