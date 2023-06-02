import React, { Component } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";

class BreathingAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breathAnim: new Animated.Value(0),
            isAnimating: false,
        };
    }

    componentDidMount() {
        this.pauseBreathing();
    }
    //PLAY
    startBreathing = () => {
        this.setState({ isAnimating: true }, () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.state.breathAnim, {
                        toValue: 1,
                        duration: 4000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.delay(3000), // Adiciona um atraso de 3 segundos
                    Animated.timing(this.state.breathAnim, {
                        toValue: 0,
                        duration: 4000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),

                ]),
            ).start();
        });
    };
    //PAUSE
    pauseBreathing = () => {
        this.setState({ isAnimating: false }, () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.state.breathAnim, {
                        toValue: this.state.breathAnim.__getValue(),
                        duration: 0,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ).stop();
        });
    };

    render() {
        
        const { breathAnim, isAnimating } = this.state;

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
                    <TouchableOpacity onPress={() => { navigation.navigate('Games'); }}>
                        <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.main}>
                    <Animated.View
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 100,
                            backgroundColor: '#708090',
                            ...breathStyle,
                        }}
                    />
                    <TouchableOpacity
                        onPress={isAnimating ? this.pauseBreathing : this.startBreathing}
                        style={{
                            padding: 10,
                            backgroundColor: isAnimating ? 'red' : 'green',
                            borderRadius: 5,
                            marginTop: 100
                        }}
                    >
                        <Text style={{ color: 'white' }}>
                            {isAnimating ? 'Pausar' : 'Começar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
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
        backgroundColor: 'transparent',
    },

    touchableContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginEnd: wp('4%')
    },
});

export default BreathingAnimation;