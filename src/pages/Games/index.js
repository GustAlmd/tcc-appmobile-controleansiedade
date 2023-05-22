import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gameData from './data';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable' 


const Card = ({ title, description, navigate }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={navigate}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      description={item.description}
      navigate={() => navigation.navigate(item.routeName)}
    />
  );

  return (
    <View style={styles.container}>
      <Animatable.View animation='fadeInDown' style={styles.containerTitle}>
        <Text style={styles.titleGame}>Jogos para React</Text>
        <Text style={styles.subtitleGame}>Escolha um Jogo Abaixo</Text>
      </Animatable.View>
      <Animatable.View style={styles.containerCards} animation='fadeInUp' >
        <FlatList
          data={gameData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.cardList}
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8896d7',
    },
    cardList: {
        alignItems: 'center',
        marginTop: 12,
    },
    containerCards: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: wp('45%'),
        height: hp('20%')
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
    titleGame: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: wp('8%'),
    },
    subtitleGame: {
        fontWeight: 'bold',
        color: '#556aa9',
        fontSize: wp('4%')
    },
    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('12%')
    }
});

export default App;
