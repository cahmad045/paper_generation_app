import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import ButtonDesign from "../Components/ButtonDesign";
import TestingNav from "../Components/TestingNav";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUser } from "../redux/userSlice";
import { authServices } from "../Services/AuthServices";
import { selectPaper } from "../redux/PaperSlice";
// import NavigationBar from "react-native-navbar";

const Home = ({ navigation }) => {
  const user = useSelector(selectUser)
  const paper = useSelector(selectPaper)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(user.isLoggedIn, "user state home jsx")
  }, [user])
  useEffect(() => {
    // console.log(JSON.stringify(paper), "paper state home jsx")
  }, [paper])
  useEffect(() => {
    authServices.login("user@gmail.com", "1234567890")
      .then(res => {
        dispatch(updateUser({ ...res?.user, isLoggedIn: true }))
      })
  }, [])
  const handlePaperGneration = () => {
    navigation.navigate("ClassSelection");
  };

  const handleAIgeneration = () => {
    navigation.navigate("AIGnerationCriteria");
  };
  return (
    <View style={styles.container}>
      {/* <Navbar /> */}
      <TestingNav />
      <Slider />
      <Text>{user.isLoggedIn && user.token ? "Logged In" : "Login Required"}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
          <ButtonDesign
            buttonText="AI Generation"
            onPress={handleAIgeneration}
            buttonWidth={150}
            buttonHeight={100}
          />
        </View>
        <View style={styles.buttonStyle}>
          <ButtonDesign
            style={styles.buttonStyle}
            buttonText="Paper Generation"
            onPress={handlePaperGneration}
            buttonWidth={150}
            buttonHeight={100}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 250,
    // Adjust the value to move the button up or down
    alignSelf: "center",
    flexDirection: "row",
    // backgroundColor: "red",
  },

  buttonStyle: {
    margin: 10,
    // color: "red",
  },
});
