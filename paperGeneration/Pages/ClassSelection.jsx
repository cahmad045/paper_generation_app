import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TestingNav from "../Components/TestingNav";
import Slider from "../Components/Slider";
import ButtonDesign from "../Components/ButtonDesign";
import { paperServices } from "../Services/PaperGenerationServices";
import { useDispatch } from "react-redux"
import { setclassLevelId, setclassLevelName } from "../redux/PaperSlice";
const ClassSelection = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    paperServices.getClasses()
      .then(value => setClasses(value?.classLevels))
      .catch((error) => {
        console.log(error, "classes", error.message)
      })
      .finally(() => setLoading(false))
  }, [navigation])

  const handleClassLevelClick = (event, classLevel, classLevelId) => {
    // const classLevel = event.target.value;
    console.log(classLevel, event.target.id);
    console.log(classLevel, classLevelId);
    dispatch(setclassLevelId(classLevelId));
    dispatch(setclassLevelName(classLevel));
    navigation.navigate("SubjectSelection");
    // console.log("button clicked")
  };
  const handleButtonPress = () => {
    navigation.navigate("SubjectSelection");
  };
  return (
    <View style={styles.container}>
      {/* <TestingNav /> */}
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
      <View style={{ flex: 1,justifyContent: 'center', alignItems:'center' }}>
        {/* <Slider /> */}
        <ScrollView contentContainerStyle={{flex:1, justifyContent: 'center', alignItems:'center'}}
        //  style={styles.buttonContainer}
        >
          {classes &&
            classes?.map((value, index) => (
              <View key={index} style={styles.buttonStyle}>
                <ButtonDesign
                  key={index}
                  onPress={(e) => handleClassLevelClick(e, value?.level, value?._id)}
                  buttonText={value?.level}
                  buttonWidth={150}
                  buttonHeight={100}
                />
              </View>
            ))}
        </ScrollView>
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
