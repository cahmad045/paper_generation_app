import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NavList from "./NavList";

const TestingNav = ({ navigation }) => {
  const [isListVisible, setListVisible] = useState(false);

  const handleIconPress = () => {
    setListVisible(!isListVisible);
  };

  // const handleProp = () =>{
  //   props.navigationProp();
  // }

  //   const handleButtonPress = (page) => {
  //     // Handle button press and navigate to the selected page
  //     console.log(`Navigating to ${page}`);
  //   };
  return (
    <View style={styles.navbarContainer}>
      <Text style={styles.title}>Paper Out</Text>
      <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
        <View style={styles.icon}></View>
        <View style={styles.icon}></View>
        <View style={styles.icon}></View>
      </TouchableOpacity>
      {/* {isListVisible && <NavList handleProp={handleProp}/>} */}
      {isListVisible && <NavList navigation={navigation} />}
    </View>
  );
};

export default TestingNav;

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    height: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    // flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "black",
    // marginHorizontal: 2,
    margin: 2,
  },
  listContainer: {
    marginTop: 10,
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
