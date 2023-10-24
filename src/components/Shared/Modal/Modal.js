import React from "react";
import { Overlay } from "@rneui/base";
import { styles } from "./Modal.styles";

export const Modal = ({ show, close, children }) => {
  return (
    <Overlay
      isVisible={show}
      onBackdropPress={close}
      overlayStyle={styles.overlay}
    >
      {children}
    </Overlay>
  );
};
