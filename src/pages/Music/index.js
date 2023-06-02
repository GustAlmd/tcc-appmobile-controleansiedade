import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable'

const App = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{flex: 1, marginTop:hp('8%')}}>
                    <Text style={{ fontSize: 30, lineHeight: 55, color: 'white', fontWeight: 'bold' }}>Músicas</Text>
                    <Text style={{ fontSize: 30, lineHeight: 50, color: 'white', fontWeight: 'bold' }}>   para</Text>
                    <Text style={{ fontSize: 30, lineHeight: 55, color: 'white', fontWeight: 'bold' }}>Relaxar</Text>
                </View>
                <Image
                    source={require('../../assets/music.png')}
                    style={{
                        position: 'absolute',
                        bottom: 1,
                        right: wp('-20%'),
                        width: wp('100%'),
                        height: hp('40%'),
                        resizeMode: 'contain',
                        marginBottom:hp('1.3%')
                    }}
                />

            </View>
            <Animatable.View style={styles.containerCards} animation='fadeInUp' >
                <View style={styles.cardList}>
                    <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('Relax')}}>
                        <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
                            <Text style={{fontWeight:'bold', fontSize:hp('4%')}}>RELAX</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}></TouchableOpacity>
                    <TouchableOpacity style={styles.card}></TouchableOpacity>
                    <TouchableOpacity style={styles.card}></TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    containerHeader: {
        height: hp('40%'),
        backgroundColor: '#556aa9',
        position: 'relative',
        padding: wp('5%'),
    },
    cardList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCards: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('-5.3%')
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
        height: hp('20%'),
        
    },
});

export default App;
