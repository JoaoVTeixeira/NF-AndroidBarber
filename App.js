import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import Home from './src/pages/home';
import Barbearias from './src/pages/barbearias';
import Barbeiros from './src/pages/barbeiros';
import Horario from './src/pages/horario';
import Confirmar from './src/pages/confirmar';
import Login from './src/pages/login';
import Agendamentos from './src/pages/agendamentos';
import Perfil from './src/pages/perfil';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create stack navigator for the login flow
function LoginStackScreen({ setIsAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Create stack navigator for the main app flow
function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Barbearias" component={Barbearias} />
      <Stack.Screen name="Barbeiros" component={Barbeiros} />
      <Stack.Screen name="Horario" component={Horario} />
      <Stack.Screen name="Confirmar" component={Confirmar} />
    </Stack.Navigator>
  );
}

// Main app with bottom tab navigator
function MainApp() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Agendamentos') {
            iconName = 'calendar';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3F45C6',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Agendamentos" component={Agendamentos} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainApp /> : <LoginStackScreen setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
}
