import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

 import { TouchableOpacity } from 'react-native-gesture-handler';

import barbeirosService from '../services/barbeirosService';

const { width: viewportWidth } = Dimensions.get('window');





export default function Barbeiros({ route }) {

  const navigation = useNavigation();
  const { barbeariaId , barbeariaNome} = route.params;

  const [barbeiro, setBarbeiros] = useState([]);

  useEffect(() => {
    async function fetchBarbeiros() {
      try {

        const response = await barbeirosService.getBarbeiro();
        console.log(response.data);
        setBarbeiros(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBarbeiros();
  }, []);


  const chooseDateHour = (barbeiroNome,barbeiroId) => {

    navigation.navigate("Horario" , { barbeariaId: barbeariaId,barbeiroId: barbeiroId ,barbeiroNome: barbeiroNome , barbeariaNome: barbeariaNome})

  }

  const calculateAverage = (avaliacoes) => {
    if (avaliacoes.length === 0) return 0;
    const sum = avaliacoes.reduce((acc, nota) => acc + nota, 0);
    return (sum / avaliacoes.length).toFixed(2);
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.slide} onPress={()=>chooseDateHour(item.nome, item._id)}>
      <Image source={{ uri: item.images }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.text}>Idade: {item.idade}</Text>
        <Text style={styles.text}>Experiência: {item.experiencia}</Text>
        <Text style={styles.text}>Especialidades: {item.especialidades.join(', ')}</Text>
        <Text style={styles.text}>Avaliação: {<StarRatingDisplay rating={calculateAverage(item.avaliacoes)} starSize={13}/>}</Text>

        {/* <Text style={styles.text}>Avaliação: {item.avaliacao.nota} - {item.avaliacao.comentario}</Text> */}
      </View>
    </TouchableOpacity>
  );


  const [filteredData, setFilteredData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const filtered = barbeiro.filter(barber => barber.barbearia_id === barbeariaId);
    setFilteredData(filtered);
  }, [barbeariaId,barbeiro]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={filteredData}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth * 0.8}
          layout={'default'}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={filteredData.length}
          activeDotIndex={activeSlide}
          carouselRef={carouselRef}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    height: 490,
    justifyContent: 'center',
    borderRadius: 15,

  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 450,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',  
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  contentContainer: {
    width: '100%',  
    paddingHorizontal: 20,  
    paddingTop: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'left',  
    width: '100%',  
    paddingHorizontal: 20, 
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'blue',
  },
  inactiveDotStyle: {
    backgroundColor: 'gray',
  },
});
