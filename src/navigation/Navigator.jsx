import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Categorías"
          component={CategoriesScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Productos"
          component={ProductsScreen}
        ></Stack.Screen>
        <Stack.Screen name="Producto" component={ProductScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
