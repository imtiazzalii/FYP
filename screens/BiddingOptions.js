import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";

const BiddingOptions = () => {

  const navigation = useNavigation();
  const [bidsInfo, setBidsInfo] = useState([]);
  const route = useRoute();
  const trip = route.params.trip;

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/showbids/${trip._id}`)
        .then((response) => {
          setBidsInfo(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateBidStatus = async (bidId, newStatus) => {
    try {
      const updatedBids = bidsInfo.map(bid => {
        if (bid._id === bidId) {
          return { ...bid, status: newStatus };
        }
        return bid;
      });
      setBidsInfo(updatedBids);
  
      await axios.put(Constants.expoConfig.extra.IP_ADDRESS + `/updateBidStatus/${bidId}`, { status: newStatus });
  
      let message, notificationType;
      if (newStatus === 'accepted') {
        message = 'Your bid has been accepted, please proceed to make payment.';
        notificationType = 'Accept';
      } else if (newStatus === 'rejected') {
        message = 'Your bid has been rejected.';
        notificationType = 'Reject';
      }
  
      const bid = bidsInfo.find(bid => bid._id === bidId);
      if (bid) {
        const bidderId = bid.bidderId;
        
        await axios.post(Constants.expoConfig.extra.IP_ADDRESS + '/chargeWallet', {
          bidderId,
          bidAmount: bid.bid,
          capacity: bid.capacity
        });

        await axios.post(Constants.expoConfig.extra.IP_ADDRESS + '/createNotification', {
          userId: bidderId,
          message,
          type: notificationType
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Dashboard/dashbg.jpeg")}
      style={tw`h-full`}
    >
      <ScrollView contentContainerStyle={tw`p-4 mt-10`}>
        {bidsInfo.filter(item => item.status === "pending").map((item, index) => (
          <View
            key={index}
            style={tw`flex-row items-center justify-between p-3 bg-white my-2 rounded-lg shadow`}
          >
            <Image
              source={{uri: item.bidderProfilePic}}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View>
              <Text style={tw`font-bold`}>{item.bidderName}</Text>
              <View style={tw`flex-row items-center`}>
                <Text>{`⭐ ${item.rating}`}</Text>
                <Text style={tw`ml-2`}>{item.capacity}kg</Text>
              </View>
            </View>
            <Text style={tw`font-bold`}>Rs. {item.bid}</Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity
                style={tw`bg-red-400 px-3 py-1 rounded-full mr-2`} onPress={() => updateBidStatus(item._id, "rejected")}
              >
                <Text style={tw`text-white text-xs`}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-green-500 px-3 py-1 rounded-full`} onPress={() => updateBidStatus(item._id, "accepted")}>
                <Text style={tw`text-white text-xs`}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default BiddingOptions;
