import React, { useState } from "react";
import { Avatar, Icon, Text } from "@rneui/base";
import { Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { styles } from "./UploadImagesForm.styles";
import Toast from "react-native-toast-message";
import { LoadingModal } from "../../../Shared";

export const UploadImagesForm = ({ formik }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getGalleryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "Activa los permisos de acceso a la galería",
        visibilityTime: 4000,
      });
    }
    return status;
  };

  const openGallery = async () => {
    const status = await getGalleryPermissions();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restourants/${uuid()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotosUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotosUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsLoading(false);
  };

  const removeImage = (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro que deseas eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = formik.values.images.filter(
              (image) => image !== img
            );
            formik.setFieldValue("images", result);
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.viewImage}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {formik.values.images.map((image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyles}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  );
};
