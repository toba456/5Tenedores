import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Icon, ListItem, SearchBar, Text } from "@rneui/base";
import { Loading } from "../components/Shared";
import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { screen } from "../utils";

export const SearchScreen = ({ navigation }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restourants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      setSearchResult(querySnapshot.docs);
    })();
  }, [searchText]);

  const goToRestaurant = (idRestaurant) =>
    navigation.navigate(screen.restourants.tab, {
      screen: screen.restourants.restaurant,
      params: { id: idRestaurant },
    });
  return (
    <>
      <SearchBar
        placeholder="Busca tu restaurante"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
      />
      {!searchResult && <Loading show text="Cargando" />}
      <ScrollView>
        {!searchResult.length ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          searchResult.map((item) => {
            const data = item.data();
            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToRestaurant(data.id)}
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
};
