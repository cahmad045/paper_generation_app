import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import ButtonDesign from "../Components/ButtonDesign";
import TestingNav from "../Components/TestingNav";
// import NavigationBar from "react-native-navbar";

const Home = ({ navigation }) => {
  const handlePaperGneration = () => {
    navigation.navigate("ClassSelection");
  };

  const handleAIgeneration = () => {
    navigation.navigate("AIGnerationCriteria");
  };
  return (
    <View style={styles.container}>
      {/* <Navbar /> */}
      <TestingNav />
      <Slider />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
          <ButtonDesign
            buttonText="AI Generation"
            onPress={handleAIgeneration}
            buttonWidth={150}
            buttonHeight={100}
          />
        </View>
        <View style={styles.buttonStyle}>
          <ButtonDesign
            style={styles.buttonStyle}
            buttonText="Paper Generation"
            onPress={handlePaperGneration}
            buttonWidth={150}
            buttonHeight={100}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 250,
    // Adjust the value to move the button up or down
    alignSelf: "center",
    flexDirection: "row",
    // backgroundColor: "red",
  },

  buttonStyle: {
    margin: 10,
    // color: "red",
  },
});
