import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TestingNav from "../Components/TestingNav";
import Slider from "../Components/Slider";
import ButtonDesign from "../Components/ButtonDesign";

const ClassSelection = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate("SubjectSelection");
  };
  return (
    <View style={styles.container}>
      <TestingNav />
      <View style={{ flex: 1 }}>
        <Slider />
      </View>
      {/* <Text>Select any class...</Text> */}

      <View style={styles.buttonContainer}>
        <View>
          <View style={styles.buttonStyle}>
            <ButtonDesign
              onPress={handleButtonPress}
              buttonText="Matric I (9th)"
              buttonWidth={150}
              buttonHeight={100}
            />
          </View>
          <View style={styles.buttonStyle}>
            <ButtonDesign
              onPress={handleButtonPress}
              style={styles.buttonStyle}
              buttonText="Intermediate I (11th)"
              buttonWidth={150}
              buttonHeight={100}
            />
          </View>
        </View>
        <View>
          <View style={styles.buttonStyle}>
            <ButtonDesign
              onPress={handleButtonPress}
              style={styles.buttonStyle}
              buttonText="Matric II (10th)"
              buttonWidth={150}
              buttonHeight={100}
            />
          </View>
          <View style={styles.buttonStyle}>
            <ButtonDesign
              onPress={handleButtonPress}
              style={styles.buttonStyle}
              buttonText="Intermediate II (12th)"
              buttonWidth={150}
              buttonHeight={100}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClassSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    // Adjust the value to move the button up or down
    // borderWidth: 1,
    // borderColor: "red",
    alignSelf: "center",
    flexDirection: "row",
  },

  buttonStyle: {
    margin: 10,
  },
});
