import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {Navigator} from './src/navigator/Navigator';

import 'react-native-gesture-handler';
import {Tabs} from './src/navigator/Tabs';

export const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </>
  );
};
