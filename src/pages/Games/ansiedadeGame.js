import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const navigation = useNavigation();
    const [breathAnim] = useState(new Animated.Value(0));
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        pauseBreathing();
    }, []);

    const startBreathing = () => {
        setIsAnimating(true);
        Animated.loop(
            Animated.sequence([
                Animated.timing(breathAnim, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                Animated.timing(breathAnim, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    const pauseBreathing = () => {
        setIsAnimating(false);
        Animated.loop(
            Animated.sequence([
                Animated.timing(breathAnim, {
                    toValue: breathAnim.__getValue(),
                    duration: 0,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).stop();
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

    touchableContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginEnd: wp('4%')
    },

});