import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

const PaperCriteria = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(false);

  const handleNumQuestionsChange = (value) => {
    setNumQuestions(value);
  };

  const handleAddQuestions = () => {
    const updatedQuestions = [];
    for (let i = 0; i < Number(numQuestions); i++) {
      updatedQuestions.push({ numParts: "", marks: "", choice: "" });
    }
    setQuestions(updatedQuestions);
    setShowGenerateButton(true);
  };

  const handleNumPartsChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].numParts = value;
    setQuestions(updatedQuestions);
  };

  const handleMarksChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].marks = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choice = value;
    setQuestions(updatedQuestions);
  };

  const handleGeneratePaper = () => {
    // Logic to generate the paper based on the entered criteria
    console.log("Generating paper...");
  };

  const renderQuestion = (question, index) => {
    return (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionLabel}>Question {index + 1}</Text>
        <View style={styles.inputContainer}>
          <Text>Number of Parts</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter number of parts"
            value={question.numParts}
            onChangeText={(value) => handleNumPartsChange(index, value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Marks for Each Part</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter marks for each part"
            value={question.marks}
            onChangeText={(value) => handleMarksChange(index, value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Choice</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter choice"
            value={question.choice}
            onChangeText={(value) => handleChoiceChange(index, value)}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Paper Criteria</Text>
      <Text>Number of Questions:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter number of questions"
        value={numQuestions}
        onChangeText={handleNumQuestionsChange}
      />
      <Button title="Add Questions" onPress={handleAddQuestions} />
      {questions.map(renderQuestion)}
      {showGenerateButton && (
        <Button title="Generate Paper" onPress={handleGeneratePaper} />
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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
});

export default PaperCriteria;
