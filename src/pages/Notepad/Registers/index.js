import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Registers({ data }) {
    const registers = data.registers;

    return (
        <View style={[styles.container, { height: hp('15%') }]}>
            <TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.textDate}>{data.date}</Text>
                    <View style={styles.emoticonContainer}>
                        <Text style={styles.emoticon}>{data.symbol}</Text>
                    </View>
                </View>
                <View style={styles.containerRegisters}>
                    {registers.map((text, id) => (
                        <View style={styles.selectionRegister} key={id}>
                            <Text style={styles.textOptions}>{text}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#556aa9',
        margin: hp('1%'),
        padding: hp('1%'),
        borderRadius: wp('2%'),
        paddingLeft: wp('3%'),
        paddingRight: wp('3%')
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('0.3%')
    },

    textDate: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('4%')
    },

    emoticon: {
        fontSize: wp('8%')
    },

    containerRegisters: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    selectionRegister: {
        backgroundColor: '#a3a8d6',
        height: hp('4.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: wp('2%'),
        padding: wp('4%'),
        borderRadius: 30,
        margin: wp('0.5%'),
    },
});
