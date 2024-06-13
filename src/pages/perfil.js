import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

function Perfil() {
    return (
        <View style={styles.page}>
            <View style={styles.content}>


                <TouchableOpacity style={styles.agendarButton} >
                    <Text style={styles.btnText}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F4FD',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    image: {
        width: 225,
        height: 225,
        marginBottom: 15,
    },
    agendarButton: {
        alignSelf: 'center',
        backgroundColor: '#3F45C6',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Perfil