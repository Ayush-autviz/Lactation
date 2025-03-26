import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { navigationRef } from './src/utils/NavigationUtil';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer  ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
};

export default App;