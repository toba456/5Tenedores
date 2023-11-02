import React, { useState, useEffect, Children } from "react";
import { View } from "react-native";
import { Icon } from "@rneui/base";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";
import { v4 as uuid } from "uuid";
import { styles } from "./BtnFavorite.styles";
import { async } from "@firebase/util";

export const BtnFavorite = ({ idRestaurant }) => {
  const [isFavorite, setIsFavorite] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      if (response.length) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [idRestaurant]);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", auth?.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setIsFavorite(!snapshot.empty);
    });

    return () => {
      unsubscribe();
    };
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuid();
      const data = {
        id: idFavorite,
        idRestaurant,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "favorites", idFavorite), data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", auth?.currentUser.uid)
    );
    const result = await getDocs(q);
    if (!result.empty) {
      const favoriteDoc = result.docs[0];
      await deleteDoc(favoriteDoc.ref);
    }
  };
  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
};
