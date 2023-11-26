import {View, Text} from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Routing from './Routing';
import NewTrip from './NewTrip';
import CustomDrawer from './CustomDrawer';
import OrderHistory from './OrderHistory';
import CurrentTrips from './CurrentTrips';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Sidebar(){
    return(
        <Drawer.Navigator screenOptions={{
            swipeEnabled: false,
        }} drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name="Routing" component={Routing} options={{ headerShown: false }}/>
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );

}

const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routing}>
                <Stack.Screen name="Sidebar" component={Sidebar} options={{ headerShown: false }}/>
                <Stack.Screen name="Routing" component={Routing} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
                <Stack.Screen name="NewTrip" component={NewTrip} options={{headerShown: false}}/>
                <Stack.Screen name="OrderHistory" component={OrderHistory} options={{headerShown: false}}/>
                <Stack.Screen name="CurrentTrips" component={CurrentTrips} options={{headerShown: false}}/>
            </Stack.Navigator>
            
        </NavigationContainer>
    );
};

export default AppNavigator;