import React, {useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; 
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'

import MainNavigator from './src/navigation/MealsNavigator';
import {enableScreens } from 'react-native-screens';
import mealsReducer from './src/store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store} ><MainNavigator /></Provider>
  );
}


export default App;