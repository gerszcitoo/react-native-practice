import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductScreen from "./src/screens/ProductScreen";
import Header from "./src/components/Header";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Variablet.ttf"),
    PressStart2P: require("./assets/fonts/PressStart2P-Static.ttf"),
  });

  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      {productId ? (
        <>
          <Header />
          <ProductScreen productId={productId} setProductId={setProductId} />
        </>
      ) : category ? (
        <>
          <Header category={category} />
          <ProductsScreen
            category={category}
            setCategory={setCategory}
            setProductId={setProductId}
          />
        </>
      ) : (
        <>
          <Header />
          <CategoriesScreen setCategory={setCategory} />
        </>
      )}
      <StatusBar style="light" />
    </>
  );
}
