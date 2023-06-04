import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const NavList = () => {
  const handleButtonPress = (page) => {
    // Handle button press and navigate to the selected page
    console.log(`Navigating to ${page}`);
  };
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        onPress={() => handleButtonPress("Page 1")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Page 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleButtonPress("Page 2")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Page 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleButtonPress("Page 3")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Page 3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleButtonPress("Page 4")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Page 4</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavList;

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "black",
    marginHorizontal: 2,
  },
  listContainer: {
    position: "absolute",
    top: "100%",
    right: 20,
    backgroundColor: "#e1e1e1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#e1e1e1",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});
