import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";

import Home from "./Pages/Home";
import MyStack from "./Components/MyStack";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Home /> */}
        <MyStack />
      </View>
    </Provider>
  );
}
export const toast = (msg) => {
  ToastAndroid.showWithGravity(
    msg || 'Toast',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
    marginTop: 31,
  },
});
