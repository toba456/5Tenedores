import React from "react";
import { View } from "react-native";
import { AirbnbRating, Input, Button } from "@rneui/base";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./AddReviewRestaurantScreen.data";
import Toast from "react-native-toast-message";
import { v4 as uuid } from "uuid";
import { auth, db } from "../../../utils";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { styles } from "./AddReviewRestaurantScreen.styles";

export const AddReviewRestaurantScreen = ({ route, navigation }) => {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const idDoc = uuid();
        const newData = formValue;

        newData.id = idDoc;
        newData.idRestaurant = route.params.idRestaurant;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateRestaurant();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al enviar la review",
        });
      }
    },
  });
  const updateRestaurant = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", route.params.idRestaurant)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;

      const arrayStars = reviews.map((review) => review.data().rating);
      const media = calculateAverage(arrayStars);

      const restaurantRef = doc(db, "restourants", route.params.idRestaurant);

      await updateDoc(restaurantRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    });
  };
  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pésimo",
              "Deficiente",
              "Normal",
              "Muy bueno",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Título"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar Review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers.reduce((accumulator, number) => accumulator + number, 0);

  const average = sum / numbers.length;

  return average;
};
