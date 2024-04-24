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

const UserChat = ({ item }) => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const recId = item._id;
      const response = await fetch(
        Constants.expoConfig.extra.IP_ADDRESS + `/messages/${token}/${recId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("Error in fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  });

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.messageType === "text"
    );

    const n = userMessages.length;

    return userMessages[n - 1];
  };
  const lastMessage = getLastMessage();
  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <View style={styles.chatItemsContainer}>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => {
          console.log("Navigating with item:", item);
          navigation.navigate("Chat", { item: item });
        }}
      >
        <View style={styles.left}>
        <Image source={{ uri: item.profilePic }} style={styles.userIcon} />
        <View style={styles.chatTextContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <View style={styles.timeAndStatusContainer}>
            {lastMessage && (
              <Text style={styles.messageText}>{lastMessage?.message}</Text>
            )}
            
          </View>
          
        </View>
        </View>
        <Text style={styles.messageTime}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
          </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "space-between"
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatTextContainer: {
    flexDirection: "column",
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
    flex: 1,
  },
  messageTime: {
    fontSize: 12,
    color: "white", // Use your message time color here
    marginRight: 4, // Add space between time and tick icon
  },
  left: {
    flexDirection: "row",
  },
});

export default UserChat;

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import tw from "twrnc";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Constants from "expo-constants";

// const UserChat = ({ item }) => {
//   const [lastMessage, setLastMessage] = useState(item.lastMessage || {});
//   const navigation = useNavigation();

//   // Update component when item changes, particularly for lastMessage
//   useEffect(() => {
//     if (item.lastMessage) {
//       setLastMessage(item.lastMessage);
//     }
//   }, [item.lastMessage]); // Listen to changes in item.lastMessage

//   const formatTime = (time) => {
//     const options = { hour: "numeric", minute: "numeric" };
//     return new Date(time).toLocaleString("en-US", options);
//   };

//   return (
//     <View style={styles.chatItemsContainer}>
//       <TouchableOpacity
//         style={styles.chatItem}
//         onPress={() => navigation.navigate("Chat", { item: item })}
//       >
//         <View style={styles.left}>
//           <Image source={{ uri: item.profilePic }} style={styles.userIcon} />
//           <View style={styles.chatTextContainer}>
//             <Text style={styles.userName}>{item.name}</Text>
//             <View style={styles.timeAndStatusContainer}>
//               {lastMessage && (
//                 <Text style={styles.messageText}>{lastMessage?.message}</Text>
//               )}
//             </View>
//           </View>
//         </View>
//         {lastMessage && (
//           <Text style={styles.messageTime}>
//             {formatTime(lastMessage?.timeStamp)}
//           </Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chatItemsContainer: {
//     paddingTop: "4%",
//   },
//   chatItem: {
//     flexDirection: "row",
//     backgroundColor: "#1D4246",
//     borderRadius: 20,
//     padding: 15,
//     marginHorizontal: 10,
//     alignItems: "center",
//     justifyContent: "space-between"
//   },
//   userIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   chatTextContainer: {
//     flexDirection: "column",
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 5,
//     marginTop: 5,
//   },
//   messageText: {
//     fontSize: 14,
//     color: "white",
//     marginRight: 4,
//   },
//   timeAndStatusContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   messageTime: {
//     fontSize: 12,
//     color: "white",
//     marginRight: 4,
//   },
//   left: {
//     flexDirection: "row",
//   },
// });

// export default UserChat;
