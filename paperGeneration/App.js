import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Home from "./Pages/Home";
import MyStack from "./Components/MyStack";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <MyStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    marginTop: 31,
  },
});
