import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Overlay, Text } from "@rneui/themed";
import { styles } from "./LoadingModal.styles";

export const LoadingModal = ({ show, text }) => {
  return (
    <Overlay
      isVisible={show}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundTransparent="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size={"large"} color={"#00a680"} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
};

LoadingModal.defaultProps = {
  show: false,
};
