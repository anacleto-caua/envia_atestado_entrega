import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ImageInput = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImagePick = () => {
      ImagePicker.showImagePicker({
        title: 'Select Image',
        mediaType: 'photo',
        quality: 0.5,
      }, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error:', response.error);
        } else {
          setSelectedImage(response.uri);
        }
      });
    };
  
    return (
      <View>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <TouchableOpacity onPress={handleImagePick}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
    },
    buttonText: {
        fontSize: 20,
        color: 'blue',
        textAlign: 'center',
    },
  });

  export default ImageInput;