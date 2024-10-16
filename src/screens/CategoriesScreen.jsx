import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import categories from "../data/categories.json";
import FlatCard from "../components/FlatCard";
import { useState, useEffect } from "react";

const CategoriesScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  const [isPortrait, setIsPortrait] = useState(true);
  useEffect(() => {
    if (width > height) {
      setIsPortrait(false);
    } else {
      setIsPortrait(true);
    }
  }, [width, height]);

  const renderCategoryItem = ({ item, index }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Productos", item.title)}>
        <FlatCard
          style={
            //operador ternario. condicion?verdadero:falso
            index % 2 == 0
              ? { ...styles.categoryItemContainer, ...styles.row }
              : { ...styles.categoryItemContainer, ...styles.rowReverse }
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text
            style={
              width < 400 ? styles.categoryTitle : styles.categoryTitleSmall
            }
          >
            {item.title}
          </Text>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoryItemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,
    flexDirection: "row",
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  categoryTitleSmall: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 80,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
