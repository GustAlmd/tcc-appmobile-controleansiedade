import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const navigation = useNavigation();
    const [breathAnim] = useState(new Animated.Value(0));
    const [isAnimating, setIsAnimating] = useState(false);
    const [breathText, setBreathText] = useState('');

    useEffect(() => {
        pauseBreathing();
    }, []);

    const startBreathing = () => {
        setIsAnimating(true);
        animateBreath('Inspire', 4000, () => {
            animateBreath('Segure a Respiração', 3000, () => {
                animateBreath('Expire', 4000, () => {
                    setIsAnimating(false);
                    setBreathText('');
                });
            });
        });
    };

    const animateBreath = (text, duration, callback) => {
        setBreathText(text);
        Animated.timing(breathAnim, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setBreathText('');
            breathAnim.setValue(0); // Redefine o valor da animação para 0
            callback && callback();
        });
    };

    const pauseBreathing = () => {
        setIsAnimating(false);
        breathAnim.stopAnimation(); // Interrompe a animação atual
        breathAnim.setValue(0); // Redefine o valor da animação para 0
    };

    const breathStyle = {
        opacity: breathAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.5],
        }),
        transform: [
            {
                scale: breathAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate('Games');}}>
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
                        ...breathStyle,
                    }}
                />

                <Text style={styles.breathText}>{breathText}</Text>

                <TouchableOpacity
                    onPress={isAnimating ? pauseBreathing : startBreathing}
                    style={{
                        height: hp('5%'),
                        width: wp('20%'),
                        padding: 10,
                        backgroundColor: '#5086c1',
                        borderRadius: 5,
                        marginTop: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {isAnimating ? 'Pausar' : 'Começar'}
                    </Text>
                </TouchableOpacity>
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
        marginTop: 20,
    },
});
