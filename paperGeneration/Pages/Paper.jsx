import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const Paper = () => {
  const logo = require("../assets/COMSATS.jpg");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.infoText}>Name: </Text>
          <Text style={styles.infoText}>Roll No: </Text>
          <Text style={styles.infoText}>Subject: Physics</Text>
        </View>
      </View>
      <View style={styles.paper}>
        <Text style={styles.question}>1. What is the capital of Pakistan?</Text>
        <Text style={styles.question}>2. What is your name?</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  paper: {
    // borderWidth: 1,
    // borderRadius: 5,
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Paper;
