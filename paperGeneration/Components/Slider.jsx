import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Slider = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://www.championtutor.com/blog/wp-content/uploads/2020/02/how-to-download-exam-papers.jpg",
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "40%",
  },
});
