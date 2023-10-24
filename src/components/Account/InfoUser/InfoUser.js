import React, { useState } from "react";
import { View } from "react-native";
import { Avatar } from "@rneui/base";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./InfoUser.styles";
import { Text } from "@rneui/themed";

export const InfoUser = ({ setLoading, setLoadingText }) => {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.canceled) uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };
  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageURL = await getDownloadURL(imageRef);

    const auth = getAuth();
    await updateProfile(auth.currentUser, { photoURL: imageURL });
    setAvatar(imageURL);

    setLoading(false);
  };
  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={[styles.avatar, { paddingTop: !avatar && 15 }]}
        icon={!avatar && { type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};
