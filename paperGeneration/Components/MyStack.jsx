import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Pages/Home";
import ClassSelection from "../Pages/ClassSelection";
// import SubjectButton from "./SubjectButton";
import SubjectSelection from "../Pages/SubjectSelection";
import PaperCriteria from "../Pages/PaperCriteria";
import AIGenerationCriteria from "../Pages/AIGenerationCriteria";
import Paper from "../Pages/Paper";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import UserProfile from "../Pages/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../Pages/SplashScreen";

const Stack = createNativeStackNavigator();
const MyStack = () => {
  const user = useSelector(selectUser);
  const [isSplash, setIsSplash] = useState(true)
  useEffect(() => {
    console.log("Aync Fn")
    AsyncStorage.getItem("user_login").then((result) => {

      if (result) {
        console.log(typeof result, result)
      }
      console.log(typeof result, result, "async out if")
    }).catch(error => {
      console.log(error, "error aysnc")
    })
  }, [])
  useEffect(() => { console.log("setter", isSplash) }, [isSplash])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user.isLoggedIn && (
          <>
            {isSplash && <Stack.Screen name="SplashScreen" component={SplashScreen} />}
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
        {user.isLoggedIn && (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
            //   options={{ title: "Welcome" }}
            />
            <Stack.Screen name="ClassSelection" component={ClassSelection} />
            <Stack.Screen
              name="SubjectSelection"
              component={SubjectSelection}
            />
            <Stack.Screen name="PaperCriteria" component={PaperCriteria} />
            <Stack.Screen
              name="AIGnerationCriteria"
              component={AIGenerationCriteria}
            />
            <Stack.Screen name="Paper" component={Paper} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

const styles = StyleSheet.create({});
