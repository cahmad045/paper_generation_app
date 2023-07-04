import React, { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as ExpoImagePicker from "expo-image-picker";

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      setSelectedImage(result?.uri);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <View style={styles.image}>
          <Icon name="image" size={130} color="gray" />
        </View>
      )}
      <Button title="Upload Image" onPress={pickImage} />
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
