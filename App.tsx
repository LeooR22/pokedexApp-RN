import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';

import 'react-native-gesture-handler';

export const App = () => {
  return (
    <>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </>
  );
};
