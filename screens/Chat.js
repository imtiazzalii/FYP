import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import axios from "axios";
import io from "socket.io-client"; // Import the Socket.IO client
import { useFocusEffect } from '@react-navigation/native';

let socket; // Declare the socket variable outside of the component

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params.item;
  const scrollViewRef = useRef();

  const [message, setMessage] = useState("");
  const [recepientData, setRecepientData] = useState();
  const [messages, setMessages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchChatData = async () => {
        fetchRecepientData();
        fetchMessages();
        // Reconnect the socket if necessary
      };
  
      fetchChatData();
  
      return () => {
        // Optional: Cleanup actions when leaving the screen
      };
    }, [item._id]) // Ensure the effect runs when item._id changes
  );

  const sendNotificationToUser = async () => {
    const notificationData = {
        userId: item._id,
        message: "You have a new chat message!",
        type: "chat"
    };

    await axios.post(Constants.expoConfig.extra.IP_ADDRESS + "/createNotification", notificationData);
  }

  const fetchRecepientData = async () => {
    try {
      const response = await fetch(
        Constants.expoConfig.extra.IP_ADDRESS + `/user/${item._id}`
      );

      const data = await response.json();
      setRecepientData(data);
      console.log(data);
    } catch (error) {
      console.log("error retrieving details", error);
    }
  };

  useEffect(() => {
    const connectSocket = async () => {
      const token = await AsyncStorage.getItem("token");
      socket = io(Constants.expoConfig.extra.IP_ADDRESS, {
        query: { token },
      });
      socket.on("connect", async () => {
        console.log("Connected to Socket.IO server");
        // Fetch userId from AsyncStorage or similar persistent storage
        const userId = await AsyncStorage.getItem("userId"); // This assumes you store userId upon login
        if (userId) {
          console.log("User ID for socket room:", userId);
          socket.emit("joinRoom", { userId }); // Pass userId as part of an object
        } else {
          console.error("User ID not found for socket room.");
        }
      });
      socket.on("receiveMessage", (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
        scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    };

    
    

    fetchRecepientData();
    connectSocket();
    fetchMessages();
    return () => {
      socket.disconnect();
      setMessages([]); // Reset messages
      setRecepientData(undefined); // Clear recipient data
    };
  }, [item._id]);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
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
  
  const handleSend = async () => {
    if (message.trim() === "") {
      
      return;
    }
    await sendNotificationToUser();
    const token = await AsyncStorage.getItem("token");
    socket.emit("sendMessage", {
      token, // Now using the state-stored userId
      recepientId: item._id,
      messageText: message,
    });
    // fetchMessages();
    setMessage(""); // Clear input after sending
    
    console.log(item);
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/Chat/Logobg.png")}
        style={tw.style("h-full", {
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        })}
      >
        <View
          style={tw.style(
            "flex-row",
            "justify-between",
            "bg-teal-900",
            "items-center",
            "px-2",
            "pt-2",
            "pb-2"
          )}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllChats");
            }}
          >
            <Image
              source={require("../assets/login/arrow-left.png")}
              style={styles.headerIcons}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: "cover",
              }}
              source={{ uri: recepientData?.profilePic }}
            />
            <Text style={styles.headerText}>{recepientData?.name}</Text>
          </View>
          <View style={styles.headerIcons}></View>
        </View>
        <ScrollView ref={scrollViewRef}>
          {messages.map((item, index) => {
            if (item.messageType === "text") {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    item?.senderId?._id !== recepientData._id
                      ? {
                          alignSelf: "flex-end",
                          backgroundColor: "#1D4246",
                          padding: 8,
                          maxWidth: "60%",
                          borderRadius: 7,
                          margin: 10,
                        }
                      : {
                          alignSelf: "flex-start",
                          backgroundColor: "#388A93",
                          padding: 8,
                          margin: 10,
                          borderRadius: 7,
                          maxWidth: "60%",
                        },
                  ]}
                >
                  <Text
                    style={{ fontSize: 13, textAlign: "left", color: "white" }}
                  >
                    {item?.message}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      color: "darkgray",
                      marginTop: 5,
                    }}
                  >
                    {formatTime(item.timeStamp)}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 25,
          }}
        >
          <TextInput
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#dddddd",
              backgroundColor: "#dddddd",
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Type Your message..."
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginHorizontal: 8,
            }}
          >
          </View>

          <TouchableOpacity
            onPress={() => handleSend("text")}
            style={{
              backgroundColor: "#007bff",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#47ADB8",
    padding: 5,
  },
});

export default Chat;
