import React, { useCallback, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as ExpoImagePicker from "expo-image-picker";
import { paperServices } from "../Services/PaperGenerationServices";

const ImagePicker = ({
  image,
  imageSetter = () => { }
}) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(null)
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
      setUploadPhoto(result.uri)
      console.log(typeof result.uri, typeof result, result)
      // imageSetter(result?.uri)
    }
  };
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
          // setIsEdit(false)
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
        }} />}
        {isEdit && <Button title="Upload Image" color={"green"} onPress={()=>{
          onUpdateIntituePhoto()
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
