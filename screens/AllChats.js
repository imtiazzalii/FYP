import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import UserChat from "./UserChat";

const AllChats = () => {
  const navigation = useNavigation();
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    await axios
      .get(Constants.expoConfig.extra.IP_ADDRESS + `/accepted-friends/${token}`)
      .then((response) => {
        setAcceptedFriends(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
    // fetchMessages();
  }, []);
  console.log(acceptedFriends);
  return (
    <ImageBackground
      source={require("../assets/AllChats/Background.png")}
      style={tw.style("h-full", {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <ScrollView>
        <View style={styles.container}>
          {/* NavBar */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../assets/Dashboard/menu2.png")}
                style={styles.headerIcons}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Chats</Text>
            <Image
              source={require("../assets/Dashboard/bell2.png")}
              style={styles.headerIcons}
            />
          </View>

          {/* Chat Items */}
          {acceptedFriends.map((friend) => (
            <UserChat key={friend._id} item={friend} />
          ))}
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>swyftbags ltd.</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // Assuming the ImageBackground covers the entire container
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1D4246", // Adjust the color to match your design
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerIcons: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#47ADB8", // Adjust the color to match your design
  },
  chatItemsContainer: {
    paddingTop: "4%",
  },
  chatItem: {
    flexDirection: "row",
    backgroundColor: "#1D4246", // Use the background color of your chat item
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    alignItems: "center",
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Use your username color here
    marginBottom: 5,
    marginTop: 5,
  },
  messageText: {
    fontSize: 14,
    color: "white",
    marginRight: 4, // Add space for the tick icon
  },
  timeAndStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageTime: {
    fontSize: 12,
    color: "white", // Use your message time color here
    marginRight: 4, // Add space between time and tick icon
  },
  statusIcon: {
    width: 16,
    height: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D4246", // Adjust the color to match your design
    padding: 8,
    marginBottom: "9%",
  },
  footerText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});

export default AllChats;

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, ImageBackground, Image, Platform, StatusBar, TouchableOpacity, ScrollView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import tw from "twrnc";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Constants from "expo-constants";
// import UserChat from "./UserChat";
// import io from "socket.io-client"; // Import the Socket.IO client

// let socket; // Declare the socket variable outside of the component

// const AllChats = () => {
//   const navigation = useNavigation();
//   const [acceptedFriends, setAcceptedFriends] = useState([]);

//   useEffect(() => {
//     const connectSocket = async () => {
//       const token = await AsyncStorage.getItem("token");
//       socket = io(Constants.expoConfig.extra.IP_ADDRESS, {
//         query: { token }
//       });
//       socket.on("connect", () => console.log('Connected to Socket.IO server'));
//       socket.on("newMessage", message => {
//         // Handle the new message event
//         const updatedFriends = acceptedFriends.map(friend => {
//           if (friend._id === message.senderId || friend._id === message.recepientId) {
//             friend.lastMessage = message; // Update the last message
//             return friend;
//           }
//           return friend;
//         });
//         setAcceptedFriends(updatedFriends);
//       });
//     };
//     connectSocket();
//     getData();
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const getData = async () => {
//     const token = await AsyncStorage.getItem("token");
//     console.log(token);

//     await axios
//       .get(Constants.expoConfig.extra.IP_ADDRESS + `/accepted-friends/${token}`)
//       .then((response) => {
//         setAcceptedFriends(response.data.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <ImageBackground
//       source={require("../assets/AllChats/Background.png")}
//       style={tw.style("h-full", {
//         marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//       })}
//     >
//       <ScrollView>
//         <View style={styles.container}>
//           {/* NavBar */}
//           <View style={styles.navBar}>
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <Image
//                 source={require("../assets/Dashboard/menu2.png")}
//                 style={styles.headerIcons}
//               />
//             </TouchableOpacity>
//             <Text style={styles.headerText}>Chats</Text>
//             <Image
//               source={require("../assets/Dashboard/bell2.png")}
//               style={styles.headerIcons}
//             />
//           </View>

//           {/* Chat Items */}
//           {acceptedFriends.map((item, index) => (
//             <UserChat key={index} item={item} />
//           ))}
//         </View>
//       </ScrollView>
//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>swyftbags ltd.</Text>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "transparent", // Assuming the ImageBackground covers the entire container
//   },
//   navBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#1D4246", // Adjust the color to match your design
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   headerIcons: {
//     width: 24,
//     height: 24,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#47ADB8", // Adjust the color to match your design
//   },
//   chatItemsContainer: {
//     paddingTop: "4%",
//   },
//   chatItem: {
//     flexDirection: "row",
//     backgroundColor: "#1D4246", // Use the background color of your chat item
//     borderRadius: 20,
//     padding: 15,
//     marginHorizontal: 10,
//     alignItems: "center",
//   },
//   userIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   chatTextContainer: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white", // Use your username color here
//     marginBottom: 5,
//     marginTop: 5,
//   },
//   messageText: {
//     fontSize: 14,
//     color: "white",
//     marginRight: 4, // Add space for the tick icon
//   },
//   timeAndStatusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   messageTime: {
//     fontSize: 12,
//     color: "white", // Use your message time color here
//     marginRight: 4, // Add space between time and tick icon
//   },
//   statusIcon: {
//     width: 16,
//     height: 16,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#1D4246", // Adjust the color to match your design
//     padding: 8,
//     marginBottom: "9%",
//   },
//   footerText: {
//     fontSize: 14,
//     color: "white",
//     textAlign: "center",
//   },
// });

// export default AllChats;
