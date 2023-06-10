import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const AIGenerationCriteria = () => {
  const [paragraph, setParagraph] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleParagraphChange = (value) => {
    setParagraph(value);
  };

  const handleGenerateQuestions = () => {
    const generatedQuestions = ["Question will display here"];

    setQuestions(generatedQuestions);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={handleGenerateQuestions}>
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
});

export default AIGenerationCriteria;
