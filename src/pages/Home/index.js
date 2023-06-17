import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, Text, Modal, Share, useWindowDimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  { image: require('../../assets/frases/f1.png') },
  { image: require('../../assets/frases/f2.png') },
  { image: require('../../assets/frases/f4.png') },
  { image: require('../../assets/frases/f5.png') },
  { image: require('../../assets/frases/f6.png') },
  { image: require('../../assets/frases/f7.png') },
  { image: require('../../assets/frases/f8.png') },
  { image: require('../../assets/frases/f9.png') },
  { image: require('../../assets/frases/f10.png') },
  { image: require('../../assets/frases/f11.png') },
  { image: require('../../assets/frases/f12.png') },
  { image: require('../../assets/frases/f13.png') },
  { image: require('../../assets/frases/f14.png') },
  { image: require('../../assets/frases/f15.png') },
  { image: require('../../assets/frases/f16.png') },
  { image: require('../../assets/frases/f17.png') },
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
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const shareImage = async () => {
    try {
      await Share.share({
        message: 'Vi essa imagem e lembrei de você! "Direto do App MindRest."',
        url: data[0].image.uri,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Arraste para cima</Text>
          <Image
      source={require('../../assets/albuns/arraste.gif')}
      style={{ width: wp('50%'), height: hp('10%'),marginRight: wp('5.5%') }}
      resizeMode="contain"
    />
        </View>
      </Modal>

      <View style={[styles.footer, { bottom: windowHeight - hp('100%') }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}></Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: hp('1%'),
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slide;