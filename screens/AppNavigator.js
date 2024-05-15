import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Wallet from "./Wallet";
import Dashboard from "./Dashboard";
import Routing from "./Routing";
import NewTrip from "./NewTrip";
import CustomDrawer from "./CustomDrawer";
import OrderHistory from "./OrderHistory";
import CurrentTrips from "./CurrentTrips";
import Chat from "./Chat";
import AllChats from "./AllChats";
import Notifications from "./Notifications";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import Status from "./Status";
import Profile from "./Profile";
import Bidding from "./Bidding";
import BiddingOptions from "./BiddingOptions";
import HelpDesk from "./HelpDesk";
import UserChat from "./UserChat";
import TermsCondition from "./TermsCondition";

function MainStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllChats"
        component={AllChats}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserChat"
        component={UserChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewTrip"
        component={NewTrip}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CurrentTrips"
        component={CurrentTrips}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Status"
        component={Status}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bidding"
        component={Bidding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BiddingOptions"
        component={BiddingOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpDesk"
        component={HelpDesk}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginNav"
        component={LoginNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function DrawerNav() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="MainStack"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

function LoginNav() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    console.log(data, "at app.jsx");
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
    </NavigationContainer>
  );
};

export default AppNavigator;
