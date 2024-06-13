import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import reservasService from '../services/reservasService';

export default function Horario({ route }) {
    const { barbeariaId, barbeariaNome, barbeiroNome, barbeiroId } = route.params;

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [horario, setHorarios] = useState([]);
    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const navigation = useNavigation();

    const specificTimeFrames = [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
    ];

    useEffect(() => {
        async function fetchHorarios() {
            try {
                let formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
                const response = await reservasService.getHorariosDisponiveis(barbeiroId, formattedDate);
                setHorarios(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchHorarios();
    }, [date]);

    const confirmarAgendamento = () => {
        navigation.navigate('Confirmar', {
            barbeariaId,
            barbeariaNome,
            barbeiroNome,
            barbeiroId,
            data: date.toLocaleDateString(),
            hora: horarioSelecionado,
        });
    };


    const selecionarHorario = (horario) => {
        setHorarioSelecionado(horario);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        if (mode === 'time' && !isTimeInSpecificFrames(currentDate)) {
            Alert.alert('Horário Inválido', 'Estabelecimento fechado nesse horário.');
        } else {
            setDate(currentDate);
        }
    };

    const isTimeInSpecificFrames = (date) => {
        const selectedTime = date.toTimeString().substring(0, 5);
        return specificTimeFrames.some(
            (frame) => selectedTime >= frame.start && selectedTime <= frame.end
        );
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                <Text style={styles.btnText}>Escolha seu dia!</Text>
            </TouchableOpacity>


            <View style={styles.agendar}>
                <Text style={styles.tituloHorario}>Horarios disponíveis para esse dia</Text>
                <ScrollView>
                    <View style={styles.horario}>
                        {horario.map((hora, index) => (
                            <TouchableOpacity key={index} style={[
                                styles.inputHorario,
                                hora === horarioSelecionado && styles.inputHorarioSelecionado,
                            ]}
                                onPress={() => selecionarHorario(hora)}>
                                <Text style={styles.horarioText}>{hora}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <Text style={styles.text}>Dia Escolhido: {date.toLocaleDateString()}</Text>

            <TouchableOpacity style={styles.button} onPress={confirmarAgendamento}>
                <Text style={styles.btnText}>Próximo!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 18,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#2F27CE',
        alignSelf: 'center',
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
    agendar: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    tituloHorario: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    horario: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    inputHorario: {
        width: '90%',
        height: 37,
        backgroundColor: '#141064',
        borderWidth: 1,
        borderColor: '#DEDCFF',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    },
    inputHorarioSelecionado: {
      backgroundColor: '#2F27CE',
    },
    horarioText: {
        color: '#FFFFFF',
    },
});
