import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RestaurantsScreen } from "../screens/Restourants/RestaurantsScreen";
import { AddRestourantScreen } from "../screens/Restourants/AddRestourantScreen";
import { AddReviewRestaurantScreen } from "../screens/Restourants/AddReviewRestaurantScreen";
import { RestaurantScreen } from "../components";

const Stack = createNativeStackNavigator();

export const RestourantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restourants.restourants}
        component={RestaurantsScreen}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name={screen.restourants.addRestourant}
        component={AddRestourantScreen}
        options={{ title: "Nuevo Restaurante" }}
      />
      <Stack.Screen
        name={screen.restourants.restaurant}
        component={RestaurantScreen}
        options={{ title: "Restaurante" }}
      />
      <Stack.Screen
        name={screen.restourants.addReviewRestaurant}
        component={AddReviewRestaurantScreen}
        options={{ title: "Nueva opinión" }}
      />
    </Stack.Navigator>
  );
};
