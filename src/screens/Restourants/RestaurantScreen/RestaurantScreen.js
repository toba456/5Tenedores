import React from "react";
import { ScrollView, Dimensions } from "react-native";
import { styles } from "./RestaurantScreen.styles";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../utils";
import { Carousel, Loading } from "../../../components/Shared";
import {
  BtnFavorite,
  BtnReviewForm,
  Header,
  Info,
  Reviews,
} from "../../../components/Restaurant";

const { width } = Dimensions.get("window");

export const RestaurantScreen = ({ route }) => {
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restourants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  if (!restaurant) return <Loading show text="Cargando restaurante" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={restaurant.images} height={250} width={width} />
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={route.params.id} />
      <Reviews idRestaurant={route.params.id} />
      <BtnFavorite idRestaurant={route.params.id} />
    </ScrollView>
  );
};
