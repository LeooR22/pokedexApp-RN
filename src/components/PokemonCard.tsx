import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageColors from 'react-native-image-colors';

import {FadeInImage} from './FadeInImage';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard: FC<Props> = ({pokemon}) => {
  const [bgColor, setBgColor] = useState('grey');

  const navigation = useNavigation<any>();

  const isMounted = useRef(true);

  useEffect(() => {
    const uri = pokemon.picture;
    ImageColors.getColors(uri, {fallback: 'grey'}).then(colors => {
      if (!isMounted.current) return;

      let primary;
      switch (colors.platform) {
        case 'android':
          // android colors properties
          primary = colors.dominant;
          break;
        case 'web':
          // web colors properties
          primary = colors.lightVibrant;
          break;
        case 'ios':
          // iOS colors properties
          primary = colors.background;
          break;
        default:
          throw new Error('Unexpected platform key');
      }
      setBgColor(primary || 'grey');

      return () => {
        isMounted.current = false;
      };
    });

    // setBgColor(bgColorResult);

    //IOS: background
    // Android: dominant
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 6,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
