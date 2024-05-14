import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './screens/AppNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';
import 'react-native-gesture-handler';

const publishableKey = 'pk_test_51PBK3FIzvBAgwQIcL4JZSClMUQRXMVgjxeNJuwmqVJ4CA7hrTvBizUXQNfZTZIgxMCmWSJmjRpn6fn3tRsN2N2ba00roOiF33Y';

const App = () => {
  return (
    <StripeProvider publishableKey={publishableKey}>
    <AppNavigator />
  </StripeProvider>
  );
};

export default App;