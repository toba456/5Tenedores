import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "@rneui/base";
import { styles } from "./LoginForm.styles";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initialValues, validationSchema } from "./LoginForm.data";
import { useNavigation } from "@react-navigation/native";
import { auth, screen } from "../../../utils";
import Toast from "react-native-toast-message";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario o contraseña incorrecta",
        });
        console.log("Error en submit form login: ", error);
      }
    },
  });
  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon name="at" type="material-community" iconStyle={styles.icon} />
        }
        onChangeText={(text) =>
          formik.setFieldValue("email", text.trim().toLocaleLowerCase())
        }
        errorMessage={formik.errors.email}
      />
      <Input
        secureTextEntry={showPassword ? false : true}
        placeholder="Contraseña"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            type="material-community"
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text.trim())}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
