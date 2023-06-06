import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const SubjectButton = ({ buttonText, onPress, url }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 100,
  },
  image: {
    width: 200,
    height: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default SubjectButton;
