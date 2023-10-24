import React, { useState } from "react";
import { View } from "react-native";
import { InfoUser } from "../../../components/Account";
import { styles } from "./UserLoggedScreen.styles";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal, AccountOptions } from "../../../components";
import { Button } from "@rneui/base";

export const UserLoggedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);
  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };
  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions onReload={onReload} />
      <Button
        title="Cerrar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logOut}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
};
