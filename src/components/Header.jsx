import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";
import MontserratText from "./MontserratText";

const Header = ({ category }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Freak Store</Text>
      <MontserratText style={styles.subtitle}>{category}</MontserratText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.grisOscuro,
  },
  title: {
    fontSize: 24,
    //fontWeight: "bold",
    color: colors.amarillo,
    fontFamily: "PressStart2P",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.blanco,
    fontFamily: "PressStart2P",
  },
});
