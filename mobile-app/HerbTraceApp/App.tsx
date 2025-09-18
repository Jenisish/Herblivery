import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import AboutScreen from './src/screens/AboutScreen';

// Import types
export type RootStackParamList = {
  Home: undefined;
  Scanner: undefined;
  Results: { packageId: string };
  About: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#f8fff9" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2d6a4f',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              title: 'HerbTrace',
              headerStyle: {
                backgroundColor: '#2d6a4f',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              }
            }} 
          />
          <Stack.Screen 
            name="Scanner" 
            component={ScannerScreen} 
            options={{ title: 'Scan QR Code' }} 
          />
          <Stack.Screen 
            name="Results" 
            component={ResultsScreen} 
            options={{ title: 'Product Details' }} 
          />
          <Stack.Screen 
            name="About" 
            component={AboutScreen} 
            options={{ title: 'About HerbTrace' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
