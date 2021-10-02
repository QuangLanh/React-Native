import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Regisner';
import ProductScreen from './screens/Product';

const Stack = createStackNavigator();

const App = () =>{
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "Login" screenOptions = {{ headerShown: false  }}>
            <Stack.Screen name = "Login" component={LoginScreen} options={{title: 'Login'}}/>
            <Stack.Screen name = "Register" component={RegisterScreen} options={{title: 'Register'}}/>
            <Stack.Screen name = "Product" component={ProductScreen} options={{title: 'Product'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;