import { useFormik } from "formik";
import React, { useState } from "react";
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import Joi from 'joi';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { authServices } from "../Services/AuthServices";
import { toast } from "../App";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
const schema = Joi.object({
  // name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com'] },
  }).regex(/@gmail\.com$/).required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required',
    'string.pattern.base': `Please Enter valid Email e.g ****@gmail.com`,
  }),
  password: Joi.string().min(6).max(128).required()
});
const signUpSchema = Yup.object({
  // name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().min(1).email("Valid Email Required").required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Password must match"),

});

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //form validation
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        let formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        const data = Object.fromEntries(formData);
        console.log({ data })
        authServices.register(values.email, values.password)
          .then((res) => {
            // dispatch(updateUser({ ...res?.user, isLoggedIn: true })) 
            console.log("REGISTER============> ", res)
            toast(res?.status || "Account Created")
            // action.resetForm()
            navigation.navigate("SignIn");
          }).catch((err) => {
            console.log("REGISTER ERROR=======> ", err)
            toast(err.status || "Error Signup - try again")
          }).finally(() => {
            console.log("REGISTER REQUEST COMPLETED")
          })
      },
    });
  // END FORMIK
  const handleSignUp = () => {
    // console.log({ name, email, password, confirmPassword })
    const { error } = schema.validate({ email, password }, {
      abortEarly: true,
    });
    if (error) {
      const newErrors = {};
      // error.details.forEach((detail) => {
      //   const key = detail.path[0];
      //   const value = detail.message;
      //   newErrors[key] = value;
      // });
      toast(error.details[0].message)
      return
    }
    if (password !== confirmPassword) {
      toast("Password Mismatch")
      // return;
    }
    toast("Signing up -  please wait")
    setLoading(true)
    authServices.register(email, password)
      .then((res) => {
        // dispatch(updateUser({ ...res?.user, isLoggedIn: true })) 
        console.log("REGISTER============> ", res)
        toast(res?.status || "Account Created")
        // action.resetForm()
        navigation.navigate("SignIn");
      }).catch((err) => {
        console.log("REGISTER ERROR=======> ", err)
        if (err?.message?.keyValue?.email) {
          toast(`user already exist` || "Unknown error")
          // return;
        }else
        toast(err.status || "Error Signup - try again")
      }).finally(() => {
        console.log("REGISTER REQUEST COMPLETED")
        setTimeout(() => setLoading(false), 1500)
      })
    // navigation.navigate("Home");
  };

  const handleLogin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Create a New Account</Text>
      {/* <View style={styles.inputContainer}>
        <Icon name="person" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View> */}
      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#999" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          inputMode="email"
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
      <TouchableOpacity disabled={loading} style={[styles.signUpButton, loading ? { backgroundColor: "lightgrey" } : {}]} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{loading ? "Wait for response" : "Sign Up"}</Text>
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
