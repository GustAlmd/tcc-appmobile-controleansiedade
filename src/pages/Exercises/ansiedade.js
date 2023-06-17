import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';;

const App = () => {
    const navigation = useNavigation();
    const [ballAnim] = useState(new Animated.Value(0));
    const [textAnim] = useState(new Animated.Value(0));
    const [isAnimating, setIsAnimating] = useState(false);
    const [breathText, setBreathText] = useState('');
    const [repetitions, setRepetitions] = useState(0);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        pauseBreathing();
        let sound = null;
      
        const playAudio = async () => {
          try {
            const { sound: audioSound } = await Audio.Sound.createAsync(
              require('../../assets/audio/relax/honeyjam.mp3')
            );
            sound = audioSound;
            await sound.playAsync();
          } catch (error) {
            console.log('Erro ao reproduzir o áudio:', error);
          }
        };
      
        playAudio();
      
        return () => {
          if (sound) {
            sound.stopAsync(); // Interrompe a reprodução do áudio
            sound.unloadAsync();
          }
        };
      }, []);
      
      

    const startBreathing = () => {
        setIsAnimating(true);
        animateBall();

        animateText('Relaxe', 4000, () => {
            animateText('Inspire', 4000, () => {
                animateText('Expire', 4000, () => {
                    if (repetitions < 3) {
                        setRepetitions(repetitions + 1);
                        startBreathing();
                    } else {
                        setIsAnimating(false);
                        setBreathText('');
                        setRepetitions(0);
                    }
                });
            });
        });
    };

    const animateBall = () => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(4000),
                Animated.timing(ballAnim, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(ballAnim, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    const animateText = (text, duration, callback) => {
        setBreathText(text);
        Animated.timing(textAnim, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setBreathText('');
            textAnim.setValue(0);
            callback && callback();
        });
    };

    const pauseBreathing = () => {
        setIsAnimating(false);
        ballAnim.stopAnimation();
        textAnim.stopAnimation();
        textAnim.setValue(0);
        setBreathText('');
    };

    const ballStyle = {
        opacity: ballAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.5],
        }),
        transform: [
            {
                scale: ballAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                }),
            },
        ],
    };

    const textStyle = {
        opacity: textAnim,
    };

    return (
        <View style={styles.container}>
            <View style={styles.touchableContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('Exercises'); }}>
                    <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.main}>
                <Animated.View
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        backgroundColor: '#5086c1',
                        ...ballStyle,
                    }}
                />

                <Animated.Text style={[styles.breathText, textStyle]}>
                    {breathText}
                </Animated.Text>

                <Animatable.View animation='fadeInUp'>
                    <TouchableOpacity
                        onPress={isAnimating ? pauseBreathing : startBreathing}
                        style={{
                            height: hp('5%'),
                            width: wp('20%'),
                            padding: 10,
                            backgroundColor: '#5086c1',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10
                        }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {isAnimating ? 'Pausar' : 'Começar'}
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556aa9',
        flex: 1

    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('3%')
    },
    header: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('7%'),
        marginTop: hp('4%'),
        marginStart: wp('5%'),
        backgroundColor: 'transparent',
    },
    breathText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: hp('8%'),
    },
    touchableContainer: {
        marginLeft: 20,
        marginTop: 30
    },
});
