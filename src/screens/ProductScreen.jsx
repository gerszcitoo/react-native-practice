import { StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
import products from "../data/products.json";

const ProductScreen = ({ productId, setProductId }) => {
  const [productFound, setProductFound] = useState({});

  useEffect(() => {
    setProductFound(products.find((product) => product.id === productId));
  }, [productId]);

  return (
    <View>
      <Pressable onPress={() => setProductId(null)}>
        <Icon name="arrow-back-ios" size={24} style={styles.goBack} />
      </Pressable>
      <Text>{productFound.title}</Text>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 10,
    color: colors.grisMedio,
  },
});
