import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import reservasService from '../services/reservasService';
import StarRating from 'react-native-star-rating-widget';
import barbeirosService from '../services/barbeirosService';

export default function Agendamentos() {
    const navigation = useNavigation();
    const [agendamentos, setAgendamentos] = useState([]);
    const [confirmingAgendamento, setConfirming] = useState(false)
    const [rating, setRating] = useState(0);


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
            { text: 'Confirmar', onPress: () => confirmaReserva(id) },
        ]);
    };

    const confirmaReserva = (id) => {
        setConfirming(true);
        reservasService.cancelaReserva(id)
    }

    const EndConfirming = () => {
        setConfirming(false);
    }

    const cancelReservation = (id) => {
        Alert.alert('Cancelamento', 'Deseja cancelar esta reserva?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => reservasService.cancelaReserva(id) },
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
                    <TouchableOpacity style={styles.confirmButton} onPress={() => confirmReservation(id)}>
                        <Text style={styles.btnText}>Confirmar Presença</Text>
                    </TouchableOpacity>
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
            {confirmingAgendamento ? (
                <View style={styles.item}>
                    <Text style={styles.title2}>Como você avalia sua reserva?</Text>
                    <StarRating
                        rating={rating}
                        onChange={setRating}
                        starSize={20}
                        style={styles.stars}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={EndConfirming} style={styles.confirmButton}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={EndConfirming} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={agendamentos}
                    renderItem={renderItem}
                    keyExtractor={item => item._id.toString()}
                />
            )}
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
    title2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
        paddingTop: 5,
        paddingLeft: 15
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
    stars: {
        marginTop: 24,
        marginBottom: 24,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
});