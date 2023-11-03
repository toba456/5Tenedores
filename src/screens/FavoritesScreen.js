import React from "react";
import { Text, ScrollView } from "react-native";
import { auth, db } from "../utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  NotFoundRestaurant,
  RestaurantFavorite,
  UserNotLogged,
} from "../components/Favorites";
import { Loading } from "../components/Shared";

export const FavoritesScreen = () => {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurantsData, setRestaurantsData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  const getRestaurants = async () => {
    try {
      if (!hasLogged) return;
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth?.currentUser.uid)
      );

      onSnapshot(q, async (snapshot) => {
        const restaurantsArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "restourants", data.idRestaurant);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          restaurantsArray.push(newData);
        }
        setRestaurantsData(restaurantsArray);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [hasLogged]);

  if (!restaurantsData) return <Loading show text="cargando" />;
  if (!hasLogged) return <UserNotLogged />;
  if (!restaurantsData.length) return <NotFoundRestaurant />;

  return (
    <ScrollView>
      {restaurantsData.map((restaurant) => (
        <RestaurantFavorite key={restaurant.id} restaurant={restaurant} />
      ))}
    </ScrollView>
  );
};
