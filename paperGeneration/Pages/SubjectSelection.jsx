import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SubjectButton from "../Components/SubjectButton";
import { useDispatch, useSelector } from "react-redux";
import { paperServices } from "../Services/PaperGenerationServices";
import { selectPaper, setsubjectId, setsubjectName } from "../redux/PaperSlice";
import ButtonDesign from "../Components/ButtonDesign";
import TestingNav from "../Components/TestingNav";
const SubjectSelection = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const paper = useSelector(selectPaper);
  const dispatch = useDispatch();

  const handleSubjectClick = (event, subjectId, subjectName) => {
    const Subject = event.target.value;
    // dispatch(setsubjectId(event.target?.id));
    dispatch(setsubjectId(subjectId));
    // dispatch(setsubjectName(event.target?.value));
    dispatch(setsubjectName(subjectName));
    navigation.navigate("PaperCriteria");
    console.log(Subject);
    // console.log("button clicked")
  };
  useEffect(() => {
    paperServices
      .getSubjects(paper?.classLevelId)
      .then((value) => setSubjects(value?.subjects))
      .catch((error) => {
        console.log(error, "subjects");
      })
      .finally(() => setLoading(false));
  }, []);
  const handleButtonPress = () => {
    navigation.navigate("PaperCriteria");
  };
  return (
    <View style={{ flex: 1 }}>
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
      <ScrollView
        // style={styles.buttonContainer}
        persistentScrollbar
        contentContainerStyle={styles.buttonContainer}
      >
        {subjects?.map((value, index) => (
          <View key={index} style={styles.buttonStyle}>
            <ButtonDesign
              key={index}
              onPress={(e) => handleSubjectClick(e, value?._id, value?.name)}
              buttonText={value?.name}
              buttonWidth={200}
              buttonHeight={100}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SubjectSelection;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 70,
    // borderWidth: 10,
    // borderColor: "#FF9999",
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 100,
  },
  buttonStyle: {
    margin: 10,
  },
});
