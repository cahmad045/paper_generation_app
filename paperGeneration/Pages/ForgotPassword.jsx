import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleForgotPassword = () => {
    // Simulating sending the password reset link
    setTimeout(() => {
      setResetLinkSent(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.forgotPasswordText}>Forgot Password</Text>
      <Text style={styles.subText}>
        Please enter your email address below. We will send you a password reset
        link.
      </Text>
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      {resetLinkSent ? (
        <Text style={styles.resetLinkSentText}>Reset link sent!</Text>
      ) : (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
  forgotPasswordText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subText: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    height: 40,
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  resetButton: {
    backgroundColor: "#FF9999",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resetLinkSentText: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginTop: 16,
  },
});

export default ForgotPassword;
