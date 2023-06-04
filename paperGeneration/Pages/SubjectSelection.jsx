import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SubjectButton from "../Components/SubjectButton";

const SubjectSelection = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate("PaperCriteria");
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        Select any one subject...
      </Text>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <SubjectButton />
          <SubjectButton />
        </View>
        <View style={styles.row}>
          <SubjectButton />
          <SubjectButton />
        </View>
      </View>
    </View>
  );
};

export default SubjectSelection;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  row: {
    flexDirection: "row",
    marginBottom: 100,
  },
});
