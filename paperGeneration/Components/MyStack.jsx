import { StyleSheet, Text, View } from "react-native";
import React from "react";
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

const Stack = createNativeStackNavigator();
const MyStack = () => {
  const user = useSelector(selectUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user.isLoggedIn && (
          <>
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
