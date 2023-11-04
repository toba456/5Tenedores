import React, { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { RestaurantRanking } from "../components/Restourants/RestaurantRanking/RestaurantRanking";

export const RankingScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "restourants"),
      orderBy("ratingMedia", "desc"),
      limit(4)
    );
    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {restaurants.map((restaurant, index) => (
        <RestaurantRanking
          key={index}
          index={index}
          restaurant={restaurant.data()}
        />
      ))}
    </ScrollView>
  );
};
