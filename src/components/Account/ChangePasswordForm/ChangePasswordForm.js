import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input } from "@rneui/base";
import { styles } from "./ChangepasswordForm.styles";
import { initialValues, validationSchema } from "./ChangePasswordForm.data";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { auth } from "../../../utils";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export const ChangePasswordForm = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = auth.currentUser;
        const { password, newPassword } = formValue;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          password
        );

        await reauthenticateWithCredential(currentUser, credentials);

        await updatePassword(currentUser, newPassword);

        onClose();

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Contraseña cambiada",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar la contraseña",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña actual"
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text.trim())}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) =>
          formik.setFieldValue("newPassword", text.trim())
        }
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Repite nueva contraseña"
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) =>
          formik.setFieldValue("repeatNewPassword", text.trim())
        }
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar Contraseña"
        containerStyle={styles.btnCotainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
