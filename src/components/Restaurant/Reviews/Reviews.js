import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AirbnbRating, ListItem, Avatar, Text } from "@rneui/base";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Loading } from "../../Shared";
import { styles } from "./Reviews.styles";

export const Reviews = ({ idRestaurant }) => {
  const [reviews, setReviews] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", idRestaurant),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setReviews(newData);
    });
    return () => unsubscribe();
  }, [idRestaurant]);

  useEffect(() => {
    if (reviews) {
      let reviewList = showAllReviews ? reviews : reviews.slice(0, 2);
      setVisibleReviews(reviewList);
    }

    setLoading(false);
  }, [showAllReviews, reviews]);

  if (!reviews) return <Loading show text="Cargando" />;

  const dateFormat = (date) => {
    if (date && date.seconds) {
      const createdAt = new Date(date.seconds * 1000);
      const year = createdAt.getFullYear();
      const month = (createdAt.getMonth() + 1).toString().padStart(2, "0");
      const day = createdAt.getDate().toString().padStart(2, "0");
      const hours = createdAt.getHours();
      const minutes = createdAt.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      return `${year}/${month}/${day} ${formattedTime}`;
    }
    return "";
  };

  const onShowAllReviews = () => {
    setLoading(true);
    setShowAllReviews(true);
  };
  return (
    <View style={styles.content}>
      {visibleReviews?.map((review) => {
        return (
          <ListItem
            key={review.id}
            bottomDivider
            containerStyle={styles.review}
          >
            <Avatar rounded source={{ uri: review.avatar }} size={"medium"} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {review.title}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {review.comment}
              </ListItem.Subtitle>
              <View style={styles.contentRatingDate}>
                <AirbnbRating
                  defaultRating={review.rating}
                  size={15}
                  readonly
                  showRating={false}
                  isDisabled
                  starContainerStyleContainerStyle={styles.starts}
                />
                <Text style={styles.date}>{dateFormat(review.createdAt)}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}

      {!showAllReviews && reviews.length > 0 && (
        <Text style={styles.moreCommentBtn} onPress={onShowAllReviews}>
          Ver todos los comentarios
        </Text>
      )}

      {loading && (
        <ActivityIndicator style={styles.loading} size={50} color="#00a680" />
      )}
    </View>
  );
};
