import React from "react";
import { ScrollView } from "react-native";
import {
  ImageRestourant,
  InfoForm,
  UploadImagesForm,
} from "../../../components/Restourants/AddRestourant";
import { Button } from "@rneui/base";
import { styles } from "./AddRestourantScreen.styles";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { initialValues, validationSchema } from "./AddRestourantScreen.data";

export const AddRestourantScreen = () => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;

        newData.id = uuid();
        newData.createdAt = new Date();

        console.log(newData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestourant formik={formik} />
      <InfoForm formik={formik} />
      <UploadImagesForm formik={formik} />
      <Button
        title="Crear restourante"
        buttonStyle={styles.addRestourant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
};
