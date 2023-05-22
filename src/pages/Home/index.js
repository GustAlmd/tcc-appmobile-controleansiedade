import React from 'react';
import { View, Image, StyleSheet, Text, Share, useWindowDimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  { image: require('../../assets/frases/Frase.png') },
  { image: require('../../assets/frases/Frase2.png') },
  { image: require('../../assets/frases/Frase3.png') },
  { image: require('../../assets/frases/Frase4.png') },
  { image: require('../../assets/frases/Frase5.png') },
  { image: require('../../assets/frases/Frase6.png') },
  { image: require('../../assets/frases/Frase7.png') },
];

const SlideItem = ({ item }) => {
  return (
    <Image
      source={item.image}
      style={styles.slideImage}
    />
  );
};

const Slide = () => {
  const windowHeight = useWindowDimensions().height; // Obtém a altura da tela

  const shareImage = async () => {
    try {
      await Share.share({
        message: 'Confira essa imagem incrível!',
        url: data[0].image.uri,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  ''
  return (
    <View style={styles.container}>
      <View style={[styles.footer, { bottom: windowHeight - hp('100%') }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            
          </Text>
        </View>
        <Ionicons
          name="share-outline"
          onPress={shareImage}
          style={{ fontSize: 30, color: 'white', marginBottom: hp('1%') }}
        />
      </View>

      <Swiper
        showsButtons={false}
        showsPagination={false}
        horizontal={false}
        loop={true}
        autoplay={true}
        autoplayTimeout={3000}
      >
        {data.map((item, index) => (
          <SlideItem key={index} item={item} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: wp('100%'),
    height: hp('100%'),
    position: 'relative',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: hp('1%'),
    alignItems: 'center'
  },

  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slide;