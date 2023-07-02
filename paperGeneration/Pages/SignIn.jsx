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

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUser)
  const handleSignIn = useCallback(() => {
    console.log("Sign in successfully.");
    authServices.login(email, password)
      .then(res => {
        if(res?.user?.isAdmin === false){
          dispatch(updateUser({ ...res?.user, isLoggedIn: true }))
          toast("Logged In")
        }else{
          toast("Login Failed - Not a user")
        }
        // navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error, "login")
        toast(`Login Failed ${error?.status}`)
      })
  }, [email, password])

  const handleForgotPassword = () => {
    console.log("Handle forgot password");
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(user.isLoggedIn, "user state home jsx")
  }, [user])
  // useEffect(, [])
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="person" size={150} color="#555" />
      </View>
      <Text style={styles.signInText}>Sign In to Continue</Text>
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
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.linkText}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
    marginTop: 16,
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

export default SignIn;
