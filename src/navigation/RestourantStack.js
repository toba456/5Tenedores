import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RestaurantsScreen } from "../screens/Restourants/RestourantsScreen";
import { AddRestourantScreen } from "../screens/Restourants/AddRestourantScreen";

const Stack = createNativeStackNavigator();

export const RestourantStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restourants.restourants}
        component={RestaurantsScreen}
        options={{ title: "Restourant" }}
      />
      <Stack.Screen
        name={screen.restourants.addRestourant}
        component={AddRestourantScreen}
        options={{ title: "Restourant" }}
      />
    </Stack.Navigator>
  );
};
