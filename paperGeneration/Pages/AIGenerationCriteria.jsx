import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { setaiQuestions } from "../redux/PaperSlice";
import Loader from "../Components/Loader";

const AIGenerationCriteria = () => {
  const dispatch = useDispatch();
  const [paragraph, setParagraph] = useState("");
  const [questions, setQuestions] = useState([]);
  const [numOfQuestions, setNumOfQuestions] = useState();
  // const [outputText, setOutputText] = useState([]);
  const [messageResponse, setMessageResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setaiQuestions(questions));
  }, [questions]);

  useEffect(() => {
    if (messageResponse !== "") {
      window.alert(messageResponse);
    }
  }, [messageResponse]);

  const handleParagraphChange = (value) => {
    setParagraph(value);
  };

  const handleNumberOfQuestionsChange = (text) => {
    // const parsedValue = parseInt(text);
    setNumOfQuestions(text);
  };

  const handleGenerateQuestions = () => {
    // const generatedQuestions = ["Question will display here"];
    console.log(numOfQuestions);
    console.log("Sending request to server");
    setIsLoading(true);
    fetch("http://192.168.10.8:4000/executePython", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scriptPath: "E:/Semester 8/NLP_model/NLP",
        args: [paragraph],
        ques_num: numOfQuestions,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const res = data.response;
        console.log(res.array);
        setQuestions(res.array);
        setMessageResponse(res.msg);
        dispatch(setaiQuestions(res?.array));
        console.log(res.msg);
        // Further processing or rendering of the question in your React app
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => setIsLoading(false));
    // setQuestions(generatedQuestions);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <Loader style={styles.loader} />
      ) : (
        <>
          <Text style={styles.heading}>Question Generator</Text>
          <Text>Enter Paragraph:</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={10}
            placeholder="Enter paragraph here"
            value={paragraph}
            onChangeText={handleParagraphChange}
          />
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Number of Questions"
            value={numOfQuestions}
            onChangeText={handleNumberOfQuestionsChange}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleGenerateQuestions}
          >
            <Text style={styles.buttonText}>Generate Questions</Text>
          </TouchableOpacity>
          {questions.length > 0 && (
            <View>
              <Text style={styles.subheading}>Generated Questions:</Text>
              {questions.map((question, index) => (
                <Text key={index} style={styles.question}>
                  {question}
                </Text>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#FF9999",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginBottom: 5,
  },
  loader: {
    marginTop: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
});

export default AIGenerationCriteria;
