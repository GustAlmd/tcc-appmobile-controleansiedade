import React, { Component } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text } from 'react-native';

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8896d7' }}>

                <Animated.View
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        backgroundColor: 'blue',
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
        );
    }
}

export default BreathingAnimation;