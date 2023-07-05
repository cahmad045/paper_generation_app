import React, { useCallback, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as ExpoImagePicker from "expo-image-picker";
import { paperServices } from "../Services/PaperGenerationServices";
import { APIS, baseURL } from "../Services/APIS";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";

const ImagePicker = ({
  image,
  imageSetter = () => { }
}) => {
  const user = useSelector(selectUser)
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(image);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(null)
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      if (result.type === 'success') {
        console.log("result", result)
        setSelectedFile(result);
      } else {
        console.log('File picking cancelled.');
      }
    } catch (error) {
      console.log('Error picking file:', error);
    }
  };
  const uploadFile = async () => {
    if (selectedFile) {
      const { uri, name, type } = selectedFile;
      try {
        axios.defaults.headers.common.Authorization = user.token
        axios.defaults.headers.common.Accept = "multipart/form-data"
        axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
        console.log(axios.defaults.headers)
        const formData = new FormData();
        formData.append('file', {
          uri,
          name,
          type,
        });
        let url = `${baseURL}/user-institue-photo`

        url = "http://192.168.2.4:4000/user-institue-photo"
        console.log(url)
        const response = await axios.post(url, formData,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //     // 'Authorization': `Bearer ${token}`
          //   },
          // }
        );

        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    }
  };
  const pickImage = async () => {
    const { status } =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library was denied!");
      return;
    }

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result?.cancelled) {
      setSelectedImage(result.assets[0].uri);
      setUploadPhoto(result.assets[0].uri)
      // console.log(typeof result.assets[0], typeof result, result.assets[0])
      // setUploadPhoto(result.assets[0])
      // imageSetter(result?.uri)
    }
  };
  const onUpdateIntituePhotoNew = () => {
    let token = user.token;
    // console.log({token})
    data = new FormData()
    data.append("file", uploadPhoto)
    console.log(data)
    axios
      .post(`${baseURL}/user-institue-photo`, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      });
  }
  const onUpdateIntituePhoto = useCallback(() => {
    paperServices.updateIntituePhoto(uploadPhoto)
      .then((res) => {
        console.log(res, "photo updated")
        imageSetter(res.institute.instituteLogo)
      })
      .catch(error => {
        console.log(error, "photo update error")
        // setName(oldName)
      }).finally(() => {
        setIsEdit(false)
      })
  }, [uploadPhoto])
  // console.log(selectedImage)
  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: uploadPhoto || image }} style={styles.image} />
      ) : (
        <View style={styles.image}>
          <Icon name="image" size={130} color="gray" />
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', gap: 10 }}>
        {!isEdit && <Button title="Change Photo" onPress={() => {
          setIsEdit(true)
          pickImage()
          // pickFile()
        }} />}
        {isEdit && <Button title="Upload Image" color={"green"} onPress={() => {
          onUpdateIntituePhoto()
          // uploadFile()
        }} />}
        {isEdit && <Button title="Cancel" color={"red"} onPress={() => {
          setUploadPhoto(null)
          setIsEdit(false)
        }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
});

export default ImagePicker;
