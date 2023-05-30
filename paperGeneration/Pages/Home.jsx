import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <Slider />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
