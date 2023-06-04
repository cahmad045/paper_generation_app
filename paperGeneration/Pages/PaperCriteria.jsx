import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const PaperCriteria = () => {
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleNumQuestionsChange = (value) => {
    setNumQuestions(value);
  };

  const handleQuestionPartChange = (index, partIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].parts[partIndex].marks = value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChoiceChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choice = value;
    setQuestions(updatedQuestions);
  };

  const handleAddPart = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].parts.push({ marks: "" });
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.push({ parts: [{ marks: "" }], choice: "" });
    setQuestions(updatedQuestions);
  };

  const renderQuestion = (question, index) => {
    return (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionLabel}>Question {index + 1}</Text>
        {question.parts.map((part, partIndex) => (
          <View key={partIndex} style={styles.partContainer}>
            <Text>Part {partIndex + 1}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter marks"
              value={part.marks}
              onChangeText={(value) =>
                handleQuestionPartChange(index, partIndex, value)
              }
            />
          </View>
        ))}
        <View style={styles.choiceContainer}>
          <Text>Choice</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter choice"
            value={question.choice}
            onChangeText={(value) => handleQuestionChoiceChange(index, value)}
          />
        </View>
        <Button title="Add Part" onPress={() => handleAddPart(index)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Paper Criteria</Text>
      <Text>Number of Questions:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter number of questions"
        value={numQuestions}
        onChangeText={handleNumQuestionsChange}
      />
      <Button title="Add Question" onPress={handleAddQuestion} />
      {questions.map(renderQuestion)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  partContainer: {
    marginBottom: 10,
  },
  choiceContainer: {
    marginTop: 10,
  },
});

export default PaperCriteria;
