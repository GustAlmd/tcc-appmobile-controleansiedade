import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

const TikTokScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar as mídias!');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const saveImage = async () => {
    if (imageUri) {
      await MediaLibrary.saveToLibraryAsync(imageUri);
      alert('Imagem salva com sucesso!');
    } else {
      alert('Nenhuma imagem selecionada!');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 300, height: 300 }} />
      ) : (
        <Text>Selecione uma imagem</Text>
      )}

      <TouchableOpacity onPress={pickImage}>
        <Text>Selecionar imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={saveImage}>
        <Text>Salvar imagem</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TikTokScreen;