import React from "react";
import { View } from "react-native";
import { styles } from "./ImageRestourant.styles";
import { Image } from "@rneui/base";

export const ImageRestourant = ({ formik }) => {
  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/imageNotFound.jpg")
        }
        style={styles.image}
      />
    </View>
  );
};
