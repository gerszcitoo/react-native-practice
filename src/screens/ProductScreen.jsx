import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
import products from "../data/products.json";
import MontserratText from "../components/MontserratText";

const ProductScreen = ({ route, navigation }) => {
  const [productFound, setProductFound] = useState({});

  const productId = route.params;

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setProductFound(products.find((product) => product.id === productId));
  }, [productId]);

  return (
    <ScrollView style={styles.productContainer}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={24} style={styles.goBack} />
      </Pressable>
      <Text style={styles.textBrand}>{productFound.brand}</Text>
      <Text style={styles.textTitle}>{productFound.title}</Text>
      <Image
        source={{ uri: productFound.mainImage }}
        alt={productFound.title}
        width="100%"
        height={width * 0.7}
        resizeMode="contain"
      />
      <Text style={styles.longDescription}>{productFound.longDescription}</Text>
      <View style={styles.productTagGroup}>
        <View style={styles.productTagList}>
          <Text>Tags: </Text>
          {
            /* <FlatList
            style={styles.productTagList}
            data={productFound.tags}
            keyExtractor={() => Math.random()}
            renderItem={({ item }) => (
              <Text style={styles.productTag}> {item} </Text>
            )}
          /> */
            productFound.tags?.map((tag) => (
              <Text key={Math.random()} style={styles.productTag}>
                {tag}
              </Text>
            ))
          }
        </View>
        {productFound.discount > 0 && (
          <Text style={styles.productDiscount}>
            Descuento - {productFound.discount} %
          </Text>
        )}
        {productFound.stock <= 0 && (
          <Text style={styles.noStockText}>Sin Stock</Text>
        )}
      </View>
      <MontserratText style={styles.productPrice}>
        Precio: $ {productFound.price}
      </MontserratText>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.9 : 1 },
          styles.addToCartButton,
        ]}
        onPress={null}
      >
        <Text style={styles.textAddToCart}>Agregar al carrito</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 8,
    color: colors.grisMedio,
  },
  productContainer: {
    paddingHorizontal: 16,
  },
  textBrand: {
    color: colors.grisOscuro,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  longDescription: {
    fontSize: 16,
    textAlign: "justify",
    paddingVertical: 8,
  },
  productTagGroup: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  productTagList: {
    flexDirection: "row",
    gap: 5,
  },
  productTag: {
    fontSize: 14,
    color: colors.morado,
    marginVertical: 2,
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
  productPrice: {
    fontWeight: 800,
    fontSize: 24,
    alignSelf: "center",
    paddingVertical: 16,
  },
  addToCartButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.morado,
    borderRadius: 16,
    marginVertical: 16,
  },
  textAddToCart: {
    color: colors.blanco,
    fontSize: 24,
    textAlign: "center",
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
