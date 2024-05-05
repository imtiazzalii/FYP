import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  amount,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native"; // Corrected import
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const Wallet = () => {
  const paymentMethods = [
    { type: "Visa", number: "**** 6881" },
    { type: "MasterCard", number: "**** 6892" }
  ];

  const recentActivity = [
    { type: "Order", amount: "-Rs.500.0" },
    { type: "Trip", amount: "+Rs.700.0" }
  ];

  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe(); // Corrected usage
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [activityList, setActivityList] = useState(recentActivity);
  const [userDetails, setUserDetails] = useState({ name: "", profilePic: "" });


  const fetchUserProfile = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');

    console.log("THIS IS WALLET PAGE: ",userId)
    console.log("THIS IS WALLET PAGE: ",token)

    if (userId && token) {
      try {
        const response = await axios.get(`${Constants.expoConfig.extra.IP_ADDRESS}/walletData/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.status === "ok") {
          setUserDetails({
            name: response.data.data.name,
            profilePic: response.data.data.profilePic
          });
        } else {
          Alert.alert("Error", "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Alert.alert("Error", "Could not fetch user data");
      }
    }
  };

  const checkAndCreateWallet = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    if (userId && token) {
      try {
        const response = await axios.post(`${Constants.expoConfig.extra.IP_ADDRESS}/wallet/create`, {
          userId: userId
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.message); // Log the server response
      } catch (error) {
        console.error("Failed to check/create wallet:", error);
        Alert.alert("Error", "Could not check/create wallet");
      }
    }
  };

  const fetchWalletDetails = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${Constants.expoConfig.extra.IP_ADDRESS}/wallet/details/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setWalletBalance(response.data.data.balance);
        setActivityList(response.data.data.transactions);
      } else {
        Alert.alert("Error", "Failed to fetch wallet details");
      }
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      Alert.alert("Error", "Could not fetch wallet details");
    }
  };

  async function initializeWallet() {
    await checkAndCreateWallet();  // Ensure this completes before proceeding.
    await fetchUserProfile();      // These can also be awaited to ensure sequence.
    await fetchWalletDetails();
  }

  useEffect(() => {

    initializeWallet();
    
  }, []);



  const handleTopUpPress = async () => {
    const amount = 75000; // Move this outside the try block, and make sure it's accessible
    setLoading(true);
    try {
      // Step 1: Fetch the payment intent client secret from the backend
      const response = await axios.post(Constants.expoConfig.extra.IP_ADDRESS + "/initiate-payment", {
        amount: amount // Now this uses the correctly scoped variable
      });
      const { clientSecret } = response.data;
  
      // Step 2: Initialize the payment sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: clientSecret,
      });
  
      if (initError) {
        Alert.alert("Initialization error", initError.message);
        setLoading(false);
        return;
      }
  
      // Step 3: Present the payment sheet
      const { error: sheetError } = await presentPaymentSheet();
      if (sheetError) {
        Alert.alert("Payment failed", sheetError.message);
      } else {
        Alert.alert("Success", "Payment is successful");
        const userId = await AsyncStorage.getItem('userId');
      const updateResponse = await axios.post(`${Constants.expoConfig.extra.IP_ADDRESS}/wallet/transaction`, {
        userId: userId,
        amount: amount / 100, // Convert back to normal units
        type: "Top-Up"
      });
      setWalletBalance(updateResponse.data.wallet.balance);
      setActivityList([...activityList, ...updateResponse.data.wallet.transactions.slice(-1)]);
      
    }
  } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
       <ImageBackground
        source={require('../assets/wallet/Headerbg.png')} // Replace with the path to your background image
        resizeMode="cover" // or "contain", "stretch", "repeat", "center" based on your need
        style={styles.walletHeaderBackground}
      >
      
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}><Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons}/></TouchableOpacity>
        </View>
            
       
        <View style={styles.walletHeader}>
          <View>
            <Text style={styles.walletTitle}>Your Wallet</Text>
            <Text style={styles.walletBalance}>Rs. {walletBalance}</Text>
            <TouchableOpacity style={styles.topUpButton} onPress={handleTopUpPress} disabled={loading}>
              <Text style={styles.topUpButtonText}>{loading ? "Processing..." : "Top up"}</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: userDetails.profilePic || undefined }}
            style={styles.userIcon}
          />
        </View>
      </ImageBackground>

      <View style={styles.paymentMethodsContainer}>
        <View style={styles.paymentHeaderContainer}>
        <Text style={styles.paymentMethodsTitle}>Payment Methods</Text>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        {paymentMethods.map((method, index) => (
          <Text key={index} style={styles.paymentMethod}>
            {method.type} {method.number}
          </Text>
        ))}
      </View>

      <View style={styles.recentActivityContainer}>
  <Text style={styles.recentActivityTitle}>Recent Activity</Text>
  {activityList.length > 0 ? (
    activityList.map((activity, index) => (
      <View key={index} style={styles.activityItem}>
        <Text style={styles.activityType}>{activity.type}</Text>
        <Text style={styles.activityAmount}>{activity.amount}</Text>
      </View>
    ))
  ) : (
    <Text style={styles.emptyMessage}>No recent activities found.</Text>
  )}
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  walletHeaderBackground: {
    // Add this new style for ImageBackground
    paddingBottom: '8%', // Same as your walletHeader paddingVertical for consistent style
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // This is crucial to allow the border radius to be visible
  },
  
  walletHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
  },
  headerIcons: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#47ADB8',
    padding:5,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: "#009688",
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingTop: '2%',
    paddingBottom: '2%',
    width: '100%',
    marginTop: 5,
},
paymentHeaderContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
},
  userIcon: {
    width: 80, // Set the width as needed
    height: 80, // Set the height as needed
    borderRadius: 25, // Adjust for roundness
    marginTop: '5%', // Adjust the position as needed
    marginBottom: '20%', // Adjust the position as needed
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
},
  walletTitle: {
    fontSize: 30,
    color: "black",
    fontWeight: "900",
  },
  walletBalance: {
    fontSize: 28,
    color: "#fff",
    marginVertical: 5,
    fontWeight:'900',
  },
  topUpButton: {
    backgroundColor: "#44A5B0",
    paddingVertical: '8%',
    paddingHorizontal: '5%',
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center',
    marginTop:'10%'
  },
  topUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight:'bold',
  },
  paymentMethodsContainer: {
    backgroundColor: "#4DB6AC",
    padding: 20,
    marginTop: '10%',
    marginHorizontal: '5%',
    borderRadius: 30,
  },
  paymentMethodsTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight:'bold'
  },
  editText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: 'flex-end',
    
  },
  paymentMethod: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  recentActivityContainer: {
    backgroundColor: "#4DB6AC",
    padding: 20,
    marginTop: '10%',
    marginHorizontal: '5%',
    borderRadius: 30,
  },
  recentActivityTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight:'bold',
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  activityType: {
    fontSize: 16,
    color: "#fff",
  },
  activityAmount: {
    fontSize: 16,
    color: "#fff",
  },
 
});

export default Wallet;