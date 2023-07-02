import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    navigation.navigate("Home");
  };

  const handleLogin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Create a New Account</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have a account? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  signUpText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
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
  signUpButton: {
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

  loginContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  linkText: {
    fontSize: 16,
    color: "#FF9999",
    // textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default SignUp;
