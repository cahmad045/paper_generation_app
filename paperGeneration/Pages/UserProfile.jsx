import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ImagePicker from "../Components/ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { paperServices } from "../Services/PaperGenerationServices";
import { setInstitue } from "../redux/PaperSlice";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const UserProfile = () => {
  const userImage = require("../assets/COMSATS.jpg"); // Replace with the path to the user image
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [instituteName, setInstituteName] = useState("abc Institute");
  const [email, setEmail] = useState("abc@gmail.com");
  const [edit, setEdit] = useState(false)
  const [upload, setUpload] = useState(false)
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [uploadPhoto, setUploadPhoto] = useState('')
  const [oldName, setOldName] = useState('')
  const [userPapers, setUserPapers] = useState(null)
  const handleUpdate = () => {
    console.log("Update Successfully");
  };
  const getProfile = useCallback(() => {
    paperServices.getProfile()
      .then(result => {
        console.log(result?.institute?.instituteName, "User Profile")
        dispatch(setInstitue(result?.institute))
        // setPhoto(result?.institute.instituteLogo)
        setName(result?.institute?.instituteName)
        setOldName(result?.institute?.instituteName)
        setUserPapers(result?.institute?.papers)
      })
      .catch(error => {
        console.log(error, "get profile error")
      })
  }, [])
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <View style={styles.container}>
      <ImagePicker isEdit = {edit}/>
      <Text>{}</Text>
      {/* <Image source={userImage} style={styles.userImage} /> */}
      <Text style={styles.emailText}>{email}</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.instituteNameInput}
        placeholder="Enter Institute Name"
        editable
      />

      {edit ?
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
          <MaterialIcons name="save" size={24} color="black" />
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Edit Profile</Text>
          <MaterialCommunityIcons name="circle-edit-outline" size={24} color="black" />
        </TouchableOpacity>
      }
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
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
    gap: 5
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserProfile;
