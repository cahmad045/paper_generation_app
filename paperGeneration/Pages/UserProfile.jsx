import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ImagePicker from "../Components/ImagePicker";

const UserProfile = () => {
  const userImage = require("../assets/COMSATS.jpg"); // Replace with the path to the user image
  const [instituteName, setInstituteName] = useState("abc Institute");
  const [email, setEmail] = useState("abc@gmail.com");
  const handleUpdate = () => {
    console.log("Update Successfully");
  };
  return (
    <View style={styles.container}>
      <ImagePicker />
      {/* <Image source={userImage} style={styles.userImage} /> */}
      <Text style={styles.emailText}>{email}</Text>
      <TextInput
        value={instituteName}
        onChangeText={setInstituteName}
        style={styles.instituteNameInput}
        placeholder="Enter Institute Name"
        editable
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  instituteNameInput: {
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "80%",
    margin: 5,
  },
  emailText: {
    fontSize: 16,
    color: "gray",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: "80%",
    backgroundColor: "lightgray",
    margin: 5,
  },
  updateButton: {
    backgroundColor: "#FF9999",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    width: "60%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserProfile;
