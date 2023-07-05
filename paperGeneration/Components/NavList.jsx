import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { updateUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavList = ({ navigation }) => {
  const dispatch = useDispatch()
  const handleButtonPress = (page) => {
    // Handle button press and navigate to the selected page
    console.log(`Navigating to ${page}`);
  };

  const handleProfile = () => {
    // Handle button press and navigate to the selected page
    navigation.navigate("UserProfile");
    // props.handleProp();
    console.log("profile");
  };

  return (
    <View style={styles.listContainer}>
      <TouchableOpacity onPress={handleProfile} style={styles.button}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleButtonPress("Page 2")
          dispatch(updateUser({}));
          AsyncStorage.removeItem("user_login")
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
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
