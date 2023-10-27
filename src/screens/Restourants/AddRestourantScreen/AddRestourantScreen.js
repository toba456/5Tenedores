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
import { doc, setDoc } from "firebase/firestore";
import { initialValues, validationSchema } from "./AddRestourantScreen.data";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export const AddRestourantScreen = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;

        newData.id = uuid();
        newData.createdAt = new Date();

        await setDoc(doc(db, "restourants", newData.id), newData);
        navigation.goBack();
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
