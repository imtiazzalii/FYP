import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const Status = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const status1 = useRef(new Animated.Value(0)).current;
  const status2 = useRef(new Animated.Value(0)).current;
  const status3 = useRef(new Animated.Value(0)).current;
  const status4 = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const start1 = () => {
    Animated.timing(status1, {
      toValue: 60,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const start2 = () => {
    Animated.timing(status2, {
      toValue: 60,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const start3 = () => {
    Animated.timing(status3, {
      toValue: 60,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const start4 = () => {
    Animated.timing(status4, {
      toValue: 60,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ImageBackground
      source={require("../assets/Dashboard/dashbg.jpeg")}
      style={tw.style("h-full")}
    >
      <View style={styles.container}>
        <View
          style={tw.style(
            "flex-row",
            "justify-between",
            "bg-teal-900",
            "items-center",
            "px-2",
            "pt-1",
            "pb-1"
          )}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Image
              source={require("../assets/Dashboard/menu2.png")}
              style={styles.headerIcons}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Trip Status</Text>
          <Image
            source={require("../assets/Dashboard/bell2.png")}
            style={styles.headerIcons}
          />
        </View>
        <View style={styles.contentbox}>
          <View style={styles.contentboxleft}>
            <Text style={styles.contentboxheading}>From</Text>
            <View style={styles.content}>
              <Image source={require("../assets/Status/User.png")} />
              <Text> Zaki</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Placeholder.png")} />
              <Text> Karachi, Pakistan</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Calendar.png")} />
              <Text> 16-Nov-2023</Text>
            </View>
          </View>
          <View style={styles.contentboxright}>
            <Text style={styles.contentboxheading}>To</Text>
            <View style={styles.content}>
              <Image source={require("../assets/Status/User.png")} />
              <Text> Ahad</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Placeholder.png")} />
              <Text> Lahore, Pakistan</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Calendar.png")} />
              <Text> 18-Nov-2023</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: "row",}}>
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              top: 30,
              marginLeft: 15,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: selectedStep > 0 ? "#85C2C9" : "#f2f2f2",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ color: "#fff" }}>1</Text> */}
              <Image
                source={require("../assets/Status/Law.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View
              style={{
                width: 6,
                height: 60,
                backgroundColor: "#f2f2f2",
                marginLeft: 21,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,

                backgroundColor: selectedStep > 1 ? "#85C2C9" : "#f2f2f2",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ color: "#fff" }}>2</Text> */}
              <Image
                source={require("../assets/Status/Search.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View
              style={{
                width: 6,
                height: 60,
                backgroundColor: "#f2f2f2",
                marginLeft: 21,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: selectedStep > 2 ? "#85C2C9" : "#f2f2f2",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ color: "#fff" }}>3</Text> */}
              <Image
                source={require("../assets/Status/Points.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View
              style={{
                width: 6,
                height: 60,
                backgroundColor: "#f2f2f2",
                marginLeft: 21,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: selectedStep > 3 ? "#85C2C9" : "#f2f2f2",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ color: "#fff" }}>4</Text> */}
              <Image
                source={require("../assets/Status/Search.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View
              style={{
                width: 6,
                height: 60,
                backgroundColor: "#f2f2f2",
                marginLeft: 21,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: selectedStep > 4 ? "#85C2C9" : "#f2f2f2",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={{ color: "#fff" }}>5</Text> */}
              <Image
                source={require("../assets/Status/delivery.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              padding: 20,
              paddingLeft: 0,
              position: "absolute",
              top: 10,
              marginLeft: 15,
            }}
          >
            <Animated.View
              style={{
                width: 6,
                height: status1,
                marginTop: 50,
                backgroundColor: "#85C2C9",
                marginLeft: 21,
              }}
            ></Animated.View>

            <Animated.View
              style={{
                width: 6,
                height: status2,
                marginTop: 50,
                backgroundColor: "#85C2C9",
                marginLeft: 21,
              }}
            ></Animated.View>
            <Animated.View
              style={{
                width: 6,
                height: status3,
                marginTop: 50,
                backgroundColor: "#85C2C9",
                marginLeft: 21,
              }}
            ></Animated.View>
            <Animated.View
              style={{
                width: 6,
                height: status4,
                marginTop: 50,
                backgroundColor: "#85C2C9",
                marginLeft: 21,
              }}
            ></Animated.View>
          </View>
        </View>
        <View>
          <View style={{flexDirection: "column", marginTop: 35, marginLeft: 10,}}>
            <Text style={{bottom: 3, fontWeight: "bold",}}>Bid accepted</Text>
            <Text style={{top: 3, fontWeight: "bold",}}>16-Nov-2023</Text>
          </View>
          <View style={{flexDirection: "column", marginTop: 75, marginLeft: 10,}}>
            <Text style={{bottom: 3, fontWeight: "bold",}}>Parcel cleared by inspector of departure city</Text>
            <Text style={{top: 3, fontWeight: "bold",}}>16-Nov-2023</Text>
          </View>
          <View style={{flexDirection: "column", marginTop: 70, marginLeft: 10,}}>
            <Text style={{bottom: 3, fontWeight: "bold",}}>Parcel in transit</Text>
            <Text style={{top: 3, fontWeight: "bold",}}>16-Nov-2023</Text>
          </View>
          <View style={{flexDirection: "column", marginTop: 70, marginLeft: 10,}}>
            <Text style={{bottom: 3, fontWeight: "bold",}}>Parcel cleared by inspector of arrival city</Text>
            <Text style={{top: 3, fontWeight: "bold",}}>18-Nov-2023</Text>
          </View>
          <View style={{flexDirection: "column", marginTop: 70, marginLeft: 10,}}>
            <Text style={{bottom: 3, fontWeight: "bold",}}>Parcel collected by the receiver</Text>
            <Text style={{top: 3, fontWeight: "bold",}}>18-Nov-2023</Text>
          </View>
        </View>
        
        </View>
        <TouchableOpacity
          style={{
            marginTop: 20,
            height: 50,
            width: 200,
            backgroundColor: "orange",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            if (selectedStep == 1) {
              start1();
            }
            if (selectedStep == 2) {
              start2();
            }
            if (selectedStep == 3) {
              start3();
            }
            if (selectedStep == 4) {
              start4();
            }
            if (selectedStep == 0) {
              setSelectedStep(selectedStep + 1);
            } else {
              setTimeout(() => {
                setSelectedStep(selectedStep + 1);
              }, 3000);
            }
          }}
        >
          <Text>Next Step</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#47ADB8",
    padding: 5,
  },
  contentbox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#44A5B0",
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  contentboxleft: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contentboxright: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  contentboxheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
});

export default Status;
