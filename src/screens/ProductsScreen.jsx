import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
import products from "../data/products.json";
import MontserratText from "../components/MontserratText";
import FlatCard from "../components/FlatCard";
import Search from "../components/Search";
import { useSelector } from "react-redux";

const ProductsScreen = ({ navigation, route }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const productsFilteredByCategory = useSelector(
    (state) => state.shopReducer.value.productsFilteredByCategory
  );

  useEffect(() => {
    setProductsFiltered(productsFilteredByCategory);
    if (search) {
      setProductsFiltered(
        productsFilteredByCategory.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  const renderProductItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Producto", item.id)}>
        <FlatCard style={styles.productContainer}>
          <View>
            <Image
              source={{ uri: item.mainImage }}
              style={styles.productImage}
              resizeMode="contain"
            ></Image>
          </View>
          <View style={styles.productDescription}>
            <MontserratText style={styles.productTitle}>
              {item.title}
            </MontserratText>
            <Text>{item.shortDescription}</Text>
            <View style={styles.productTagGroup}>
              <Text>Tags: </Text>
              <FlatList
                style={styles.productTagList}
                data={item.tags}
                keyExtractor={() => Math.random()}
                renderItem={({ item }) => (
                  <Text style={styles.productTag}> {item} </Text>
                )}
              />
            </View>
            {item.discount > 0 && (
              <Text style={styles.productDiscount}>
                Descuento {item.discount} %
              </Text>
            )}
            {item.stock <= 0 && (
              <Text style={styles.noStockText}>Sin Stock</Text>
            )}
            <MontserratText style={styles.productPrice}>
              Precio: $ {item.price}
            </MontserratText>
          </View>
        </FlatCard>
      </Pressable>
    );
  };
  return (
    <>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={24} style={styles.goBack} />
      </Pressable>
      <Search setSearch={setSearch} />
      {productsFiltered == "" ? (
        <MontserratText style={styles.noProducts}>
          No hay productos :(
        </MontserratText>
      ) : (
        <FlatList
          data={productsFiltered}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
        />
      )}
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    gap: 15,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDescription: {
    width: "75%",
  },
  productTitle: {
    fontWeight: 800,
    fontSize: 18,
    marginBottom: 5,
  },
  productTagGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  productTagList: {
    flexDirection: "row",
  },
  productTag: {
    color: colors.morado,
    marginVertical: 5,
  },
  productDiscount: {
    color: colors.blanco,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.naranjaBrillante,
    textAlign: "center",
    maxWidth: "45%",
    marginVertical: 5,
  },
  goBack: {
    padding: 10,
    color: colors.grisMedio,
  },
  productPrice: {
    fontWeight: 800,
    fontSize: 18,
  },
  noProducts: {
    color: colors.rojo,
    fontWeight: 700,
    fontSize: 18,
    textAlign: "center",
  },
  noStockText: {
    fontSize: 18,
    color: colors.rojo,
  },
});
