import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import tw from 'twrnc';

const BiddingOptions = () => {
  // Dummy data for the example
  const items = [
    { name: 'Cristiano', rating: 5, weight: '4kg', price: 'Rs. 400' },
    // ...more items
  ];

  return (
    <ImageBackground source={require("../assets/Dashboard/dashbg.jpeg")} style={tw`h-full`}>
      <ScrollView contentContainerStyle={tw`p-4 mt-10`}>
        {items.map((item, index) => (
          <View key={index} style={tw`flex-row items-center justify-between p-3 bg-white my-2 rounded-lg shadow`}>
            <Image
              source={require("../assets/Dashboard/cr7.png")}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View>
              <Text style={tw`font-bold`}>{item.name}</Text>
              <View style={tw`flex-row items-center`}>
                <Text>{`⭐ ${item.rating}`}</Text>
                <Text style={tw`ml-2`}>{item.weight}</Text>
              </View>
            </View>
            <Text style={tw`font-bold`}>{item.price}</Text>
            <View style={tw`flex-row`}>
              <TouchableOpacity style={tw`bg-red-400 px-3 py-1 rounded-full mr-2`}>
                <Text style={tw`text-white text-xs`}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-green-500 px-3 py-1 rounded-full`}>
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
