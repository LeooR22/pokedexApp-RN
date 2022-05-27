import * as React from 'react';

import {PokemonScreen} from '../screens/PokemonScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
  SearchScreenTab: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon; color: string};
};

const TabSearch = createStackNavigator<RootStackParams>();

export const TabSearchScreen = () => {
  return (
    <TabSearch.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <TabSearch.Screen name="SearchScreenTab" component={SearchScreen} />
      <TabSearch.Screen name="PokemonScreen" component={PokemonScreen} />
    </TabSearch.Navigator>
  );
};
