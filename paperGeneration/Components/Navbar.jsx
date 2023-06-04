import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Navbar = () => {
  return (
    <View style={styles.navBar}>
      {/* <Text style={{ fontSize: 20 }}>Criteria Selection</Text> */}
      <Text style={styles.navBarTitle}>Paper Out</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginTop: 3,
    // borderBottomWidth: 1,
  },
  navBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#581845",
  },
});
