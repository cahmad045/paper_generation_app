import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { authServices } from "../Services/AuthServices";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../redux/userSlice";
import { toast } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation, isScreen = true, setter = () => { } }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("Aync Fn")
    AsyncStorage.getItem("user_login").then((result) => {

      if (result) {
        user = JSON.parse(result)
        dispatch(updateUser({ ...user, isLoggedIn: true }))
        console.log(typeof user, user)
        setTimeout(() => setter(false), 500)
        setTimeout(() => navigation.navigate("Home"), 500)
      } else {
        setTimeout(() => setter(false), 0)
        setTimeout(() => navigation.navigate("SignIn"), 500)
        console.log(result, "async else")

      }
      console.log(result, "async out if")
    }).catch(error => {
      console.log(error, "error aysnc")
    })
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="person" size={150} color="#555" />
      </View>
      <Text style={styles.signInText}>Welcome To</Text>
      <TouchableOpacity style={styles.signInButton} onPress={() => {
        navigation.navigate("SignIn")
      }}>
        <Text style={styles.buttonText}>EduGen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // backgroundColor: "#f1f1f1",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  signInText: {
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
  signInButton: {
    backgroundColor: "#FF9999",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    // marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginRight: 8,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#FF9999",
    // textDecorationLine: "underline",
  },
  createAccountContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  createAccountText: {
    fontSize: 16,
    color: "#333",
  },
  linkText: {
    fontSize: 16,
    color: "#FF9999",
    // textDecorationLine: "underline",
    // fontWeight: "bold",
  },
});

export default SplashScreen;
