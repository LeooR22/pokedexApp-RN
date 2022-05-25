import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigator/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen: FC<Props> = ({navigation, route}) => {
  const {color, simplePokemon} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemon: pokemonFull} = usePokemon(id);
  console.log(pokemonFull);

  return (
    <View style={{flex: 1}}>
      {/* Header Container */}
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        {/* BackButton */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 5}}>
          <Icon name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>
        {/* Nombre del pokemon */}
        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + '\n'}#{id}
        </Text>
        {/* Pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {/* Detalles y loading */}

      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonFull} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomEndRadius: 1000,
    borderBottomStartRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});
