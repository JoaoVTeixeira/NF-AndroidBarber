import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import reservasService from '../services/reservasService';

const Confirmar = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { barbeariaId, barbeariaNome, barbeiroNome , barbeiroId , data, hora } = route.params;
  function formatDateToMMDDYYYY(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${month}/${day}/${year}`;
  }
  console.log("Test");
  console.log(barbeariaId, barbeiroNome, barbeariaNome, formatDateToMMDDYYYY(data), hora);

  

  const reserva = {
    unidade: barbeariaId,
    unidadeNome: barbeariaNome,
    barbeiroNome: barbeiroNome,
    barbeiro: barbeiroId,
    data: formatDateToMMDDYYYY(data),
    horas: hora,
    cliente: 1,
    status: "R"
  }

  const confirm = async () => {

    await reservasService.createReserva(reserva);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.text}>Barbearia: {barbeariaNome}</Text>
        <Text style={styles.text}>Barbeiro: {barbeiroNome}</Text>
        <Text style={styles.text}>Data: {data}</Text>
        <Text style={styles.text}>Hora: {hora}</Text>
        <TouchableOpacity style={styles.agendarButton} onPress={confirm}>
          <Text style={styles.btnText}>ConfirmarAgendamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F4FD',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 2, 
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
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

export default Confirmar;
