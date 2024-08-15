import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

export default App;
