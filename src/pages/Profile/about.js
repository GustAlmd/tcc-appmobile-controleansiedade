import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Linking  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const developers = [
  {
    name: 'Andrey de Mendonça',
    role: 'Desenvolvedor',
    image: require('../../assets/desenvolvedores/Andrey.jpeg'),
    instagram: 'https://www.instagram.com/zdrey.7/',
    github: 'https://github.com/seu_perfil_do_github',
  },
  {
    name: 'Gustavo de Almeida',
    role: 'Desenvolvedor',
    image: require('../../assets/desenvolvedores/Almeida.jpeg'),
    instagram: 'https://www.instagram.com/gustalmd/',
    github: 'https://github.com/GustAlmd/',
  },
  {
    name: 'João Doja',
    role: 'Designer',
    image: require('../../assets/desenvolvedores/Joao.jpeg'),
    instagram: 'https://www.instagram.com/seu_perfil_do_instagram',
    github: 'https://github.com/seu_perfil_do_github',
  },
  {
    name: 'Monique Cristine',
    role: 'Designer',
    image: require('../../assets/desenvolvedores/Monique.jpeg'),
    instagram: 'https://www.instagram.com/seu_perfil_do_instagram',
    github: 'https://github.com/seu_perfil_do_github',
  },
];

const App = () => {
  const handleInstagramPress = (url) => {
    Linking.openURL(url);
  };

  const handleGithubPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Image
          source={require('../../assets/logo/logoPretaRoxa.png')}
          style={{ width: wp('100%'), height: hp('10%') }}
          resizeMode="contain"
        />
      </View>


      <Text style={styles.title}>Desenvolvedores</Text>
      <ScrollView style={styles.cardContainer}>
        {developers.map((developer, index) => (
          <Animatable.View key={index} style={styles.card} animation='fadeInRight'>
            <Image source={developer.image} style={styles.image} />
            <Text style={styles.name}>{developer.name}</Text>
            <Text style={styles.role}>{developer.role}</Text>
            <View style={styles.icones}>
              <TouchableOpacity style={{marginRight:wp('1.5%')}} onPress={() => handleInstagramPress(developer.instagram)}>
                <Text>
                  <Ionicons name="logo-instagram" size={26} color="black" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGithubPress(developer.github)}>
                <Text>
                  <FontAwesome name="github" size={26} color="black" />
                </Text>
              </TouchableOpacity>
            </View>

          </Animatable.View>
        ))}
      </ScrollView>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  icones: {
    flexDirection: 'row',
    marginTop: hp('1%')
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  cardContainer: {
    flexDirection: 'column',
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    width: wp('90%')
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  instagramLogo: {
    height: hp('3%'),
    width: wp('5%'),
    marginTop: 8
  },
  githubLogo: {
    height: hp('4%'),
    width: wp('5.4%'),
    marginTop: 8
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    fontSize: 12,
    color: '#121212',
  },
});

export default App;