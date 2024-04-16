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
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params.item;
  const [message, setMessage] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const [messages, setMessages] = useState([]);

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

  const handleSend = async (messageType) => {
    try {
      if (messageType === "text" && (!message || !message.trim())) {
        alert("Message cannot be empty!");
        return;
      }
  
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
  
      const formData = new FormData();
      formData.append("recepientId", recepientData._id);
      formData.append("messageType", "text");
      formData.append("messageText", message);
  
      const response = await fetch(`${Constants.expoConfig.extra.IP_ADDRESS}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        body: formData,
      });
  
      if (response.ok) {
        setMessage("");
        fetchMessages();
      } else {
        console.error("Failed to send message:", response.status);
      }
    } catch (error) {
      console.error("Error in sending the message", error);
    }
  };

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(
          Constants.expoConfig.extra.IP_ADDRESS + `/user/${item._id}`
        );

        const data = await response.json();
        setRecepientData(data);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecepientData();
    fetchMessages();
  }, []);

  // const uploadImage = async () => {
  //   try {
  //     let result = {};
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //       base64: true,
  //     });

  //     if (!result.canceled) {
  //       handleSend("image", result.assets[0].base64);
  //       //console.log(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     // alert("Error uploading image: " + error.message);
  //   }
  // };
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerLeft: () => {
  //       return (
  //         <View style={{ flexDirection: "row", alignItems: "center", gap: 10}}>
  //           <Ionicons
  //             onPress={() => navigation.goBack()}
  //             name="arrow-back"
  //             size={24}
  //             color="black"
  //           />
  //           <View style={{ flexDirection: "row", alignItems: "center" }}>
  //             <Image
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //                 borderRadius: 15,
  //                 resizeMode: "cover",
  //               }}
  //               source={{ uri: recepientData?.profilePic }}
  //             />
  //             <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
  //               {recepientData?.name}
  //             </Text>
  //           </View>
  //         </View>
  //       );
  //     },
  //   });
  // }, [recepientData]);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  //console.log(messages);
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
        <ScrollView>
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
            // if (item.messageType === "image") {
            //   // const baseUrl =
            //   //   "E:\\Swyftbags_backend\\files\\";
            //   // const imageUrl = item.imageUrl;
            //   // const filename = imageUrl.split("\\").pop();
            //   // const source = { uri: baseUrl + filename };
            //   // console.log(source);
            //   return (
            //     <TouchableOpacity
            //       key={index}
            //       style={[
            //         item?.senderId?._id !== recepientData._id
            //           ? {
            //               alignSelf: "flex-end",
            //               backgroundColor: "#1D4246",
            //               padding: 8,
            //               maxWidth: "60%",
            //               borderRadius: 7,
            //               margin: 10,
            //             }
            //           : {
            //               alignSelf: "flex-start",
            //               backgroundColor: "#388A93",
            //               padding: 8,
            //               margin: 10,
            //               borderRadius: 7,
            //               maxWidth: "60%",
            //             },
            //       ]}
            //     >
            //       <View>
            //         <Image
            //           source={{uri: item.imageUrl}}
            //           style={{ width: 200, height: 200, borderRadius: 7 }}
            //         />
            //         <Text
            //           style={{
            //             textAlign: "right",
            //             fontSize: 9,
            //             position: "absolute",
            //             right: 10,
            //             bottom: 7,
            //             color: "darkgray",
            //             marginTop: 5,
            //           }}
            //         >
            //           {formatTime(item?.timeStamp)}
            //         </Text>
            //       </View>
            //     </TouchableOpacity>
            //   );
            // }
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
            {/* <Entypo name="camera" size={24} color="black" onPress={uploadImage} /> */}
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
