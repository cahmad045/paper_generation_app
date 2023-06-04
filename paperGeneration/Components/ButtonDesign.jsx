import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const ButtonDesign = ({ buttonText, onPress, buttonWidth, buttonHeight }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { width: buttonWidth, height: buttonHeight },
      ]}
    >
      {/* <Image
        source={{
          uri: imagePath,
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      /> */}
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonDesign;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    backgroundColor: "#FF9999",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  buttonContent: {
    position: "relative",
    zIndex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
