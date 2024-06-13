import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import unidadesService from '../services/unidadesService';

export default function Barbearias() {
  const navigation = useNavigation();
  const [unidade, setUnidades] = useState([]);

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await unidadesService.getUnidades();
        console.log(response.data);
        setUnidades(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUnidades();
  }, []);

  const chooseBarbeiros = (id, nome) => {
    navigation.navigate('Barbeiros', { barbeariaId: id, barbeariaNome: nome });
  }

  const Item = ({ id, nome, endereco, cidade, estado, telefone, email, site, horario_funcionamento, image }) => (
    <TouchableOpacity style={styles.item} onPress={() => chooseBarbeiros(id, nome)}>
      <View style={styles.itemContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{nome}</Text>
          <Text style={styles.text}>{horario_funcionamento}</Text>
          <Text style={styles.text}>{cidade}, {estado}</Text>
          <Text style={styles.text}>{telefone}</Text>
          
          <Text style={styles.text}>{endereco}</Text>
        </View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item._id}
      nome={item.nome}
      endereco={item.endereco}
      cidade={item.cidade}
      estado={item.estado}
      telefone={item.telefone}
      email={item.email}
      site={item.site}
      horario_funcionamento={item.horario_funcionamento}
      image={item.images} // Assuming your API returns an image URL
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={unidade}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </SafeAreaView>
  );
};

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
    elevation: 3, // For Android shadow
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  text: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  image: {
    width: 120,
    height: '100%', // Make the image take the full height of the item
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
