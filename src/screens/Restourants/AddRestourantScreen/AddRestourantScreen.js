import React from "react";
import { Text, View } from "react-native";
import { InfoForm } from "../../../components/Restourants/AddRestourant";
import { Button } from "@rneui/base";
import { styles } from "./AddRestourantScreen.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestourantScreen.data";

export const AddRestourantScreen = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });

  return (
    <View>
      <InfoForm formik={formik} />
      <Button
        title="Crear restourante"
        buttonStyle={styles.addRestourant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};
