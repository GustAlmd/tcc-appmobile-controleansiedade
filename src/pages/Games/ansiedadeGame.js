
import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [textAnim] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    setIsAnimating(true);
    Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
        Animated.timing(textAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(textAnim, {
          toValue: 2,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(textAnim, {
          toValue: 3,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.delay(4000),
      ]),
    ).start();
  };

  const getText = () => {
    return textAnim.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: ['Relaxa', 'Inspire', 'Segure a respiração', 'Expire'],
    });
  };

  const breathStyle = {
    opacity: textAnim.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [1, 1, 1, 0],
    }),
    transform: [
      {
        scale: textAnim.interpolate({
          inputRange: [0, 1, 2, 3],
          outputRange: [1, 1, 1.5, 1],
        }),
      },
    ],
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      textAnim.stopAnimation();
      setIsAnimating(false);
    } else {
      startAnimation();
      setIsAnimating(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Games')}>
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
        >
          <Text style={styles.text}>{getText()}</Text>
        </Animated.View>

        <TouchableOpacity
          onPress={toggleAnimation}
          style={styles.touchableContainer}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isAnimating ? 'Pausar' : 'Começar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


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

export default App;