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
  RefreshControl,
  Alert,
  Modal,
  TextInput,
  amount,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native"; // Corrected import
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const Wallet = () => {
  

  const recentActivity = [
    { type: "Order", amount: "-Rs.500.0" },
  ];

  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe(); // Corrected usage
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [activityList, setActivityList] = useState(recentActivity);
  const [userDetails, setUserDetails] = useState({ name: "", profilePic: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");


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

  

  // const checkAndCreateWallet = async () => {
  //   const userId = await AsyncStorage.getItem('userId');
  //   const token = await AsyncStorage.getItem('token');
  //   if (userId && token) {
  //     try {
  //       const response = await axios.post(`${Constants.expoConfig.extra.IP_ADDRESS}/wallet/create`, {
  //         userId: userId
  //       }, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       console.log(response.data.message); // Log the server response
  //     } catch (error) {
  //       console.error("Failed to check/create wallet:", error);
  //       Alert.alert("Error", "Could not check/create wallet");
  //     }
  //   }
  // };

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

  const onRefresh = async () => {
    setRefreshing(true);
    await initializeWallet();
    setRefreshing(false); // Set refreshing to false after data is fetched
  };

  async function initializeWallet() {
    // await checkAndCreateWallet();  // Ensure this completes before proceeding.
    await fetchUserProfile();      // These can also be awaited to ensure sequence.
    await fetchWalletDetails();
  }

  useEffect(() => {

    initializeWallet();
    
  }, []);



  const handleTopUpPress = async () => {
    if (!topUpAmount || isNaN(topUpAmount)) {
      Alert.alert("Error", "Please enter a valid amount.");
      return;
    }

    const amount = parseFloat(topUpAmount) * 100; // Convert to smallest currency unit
    setLoading(true);
    try {
      const response = await axios.post(Constants.expoConfig.extra.IP_ADDRESS + "/initiate-payment", {
        amount: amount
      });
      const { clientSecret } = response.data;

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'notJust.dev',
        paymentIntentClientSecret: clientSecret,
      });

      if (initError) {
        Alert.alert("Initialization error", initError.message);
        setLoading(false);
        return;
      }

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
      setModalVisible(false); // Close the modal after processing
      setTopUpAmount(""); // Clear the input field
    }
  };
  

  return (
    <ScrollView refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/wallet/Headerbg.png')}
          resizeMode="cover"
          style={styles.walletHeaderBackground}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
              <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons} />
            </TouchableOpacity>
          </View>

          <View style={styles.walletHeader}>
            <View>
              <Text style={styles.walletTitle}>My Wallet</Text>
              <Text style={styles.walletBalance}>Rs. {walletBalance}</Text>
              <TouchableOpacity style={styles.topUpButton} onPress={() => setModalVisible(true)} disabled={loading}>
                <Text style={styles.topUpButtonText}>{loading ? "Processing..." : "Top up"}</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: userDetails.profilePic || undefined }}
              style={styles.userIcon}
            />
          </View>
        </ImageBackground>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Top-Up Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Amount"
              value={topUpAmount}
              onChangeText={setTopUpAmount}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleTopUpPress}
              >
                <Text style={styles.modalButtonText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ff5c5c' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  walletHeaderBackground: {
    paddingBottom: '8%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  emptyMessage:{
    color:'white',
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
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingTop: '2%',
    paddingBottom: '2%',
    width: '100%',
    marginTop: 5,
  },
  paymentHeaderContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  userIcon: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginTop: '5%',
    marginBottom: '20%',
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
    marginBottom: '100%',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#4DB6AC',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Wallet;