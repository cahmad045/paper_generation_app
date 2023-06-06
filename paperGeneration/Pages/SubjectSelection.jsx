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
          <SubjectButton
            buttonText="Physics"
            url="https://www.zdnet.com/a/img/resize/4bca2f788465d943b8a1298405cf0b2246f447cd/2022/01/12/9ee89c8b-8777-49da-af0b-df23d4302b9a/physics-concept.jpg?auto=webp&fit=crop&height=900&width=1200"
            onPress={handleButtonPress}
          />
          <SubjectButton
            buttonText="Chemistry"
            url="https://www.nist.gov/sites/default/files/styles/2800_x_2800_limit/public/images/2019/05/23/welcomia_ss_periodictbl_552027100.jpg?itok=xc9amOKS"
          />
        </View>
        <View style={styles.row}>
          <SubjectButton
            buttonText="Biology"
            url="https://erudera.com/media/images/biology.2e16d0ba.fill-10000x10000.jpg"
          />
          <SubjectButton
            buttonText="Computer Science"
            url="https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg"
          />
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
