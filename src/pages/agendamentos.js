import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import reservasService from '../services/reservasService';

export default function Agendamentos() {
    const navigation = useNavigation();
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        async function fetchAgendamentos() {
            try {
                const response = await reservasService.getReservas(1);
                console.log('Fetched data:', response.data);
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchAgendamentos();
    }, []);

    const confirmReservation = (id) => {
        Alert.alert('Confirmação', 'Deseja confirmar esta reserva?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Confirmar', onPress: () => console.log(`Reserva ${id} confirmada!`) },
        ]);
    };

    const cancelReservation = (id) => {
        Alert.alert('Cancelamento', 'Deseja cancelar esta reserva?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => console.log(`Reserva ${id} cancelada!`) },
        ]);
    };

    const Item = ({ id, nome, horario_funcionamento, data, barbeiro, status }) => (
        <View style={styles.item}>
            <View style={styles.itemContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.subTitle}>{barbeiro}</Text>
                    <Text style={styles.text}>{data.toLocaleString()}</Text>
                    <Text style={styles.text}>{horario_funcionamento}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        status == "R" ?
                            <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReservation(id)}>
                                <Text style={styles.btnText}>Confirmar Presença</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReservation(id)}>
                                <Text style={styles.btnText}>Confirmar Presença</Text>
                            </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.cancelButton} onPress={() => cancelReservation(id)}>
                        <Text style={styles.btnText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item
            id={item._id}
            nome={item.unidadeNome}
            barbeiro={item.barbeiroNome}
            horario_funcionamento={item.horas}
            data={new Date(item.data)}
            status={item.status}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={agendamentos}
                renderItem={renderItem}
                keyExtractor={item => item._id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#3F45C6',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    itemContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        color: '#FFFFFF',
        marginBottom: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    confirmButton: {
        backgroundColor: '#28a745',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
