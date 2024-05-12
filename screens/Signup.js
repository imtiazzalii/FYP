import React, { useState } from "react";
// Dynamic
// Error message
// 
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Button,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import Field from "./Field";
import tw from "twrnc";
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Signup = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [loading, setLoading] = useState(false);  // Loading state

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  };
  const onSubmit = async (data) => {

    setLoading(true); 

    const pushToken = await registerForPushNotificationsAsync();
    if (!pushToken) {
        alert("Unable to get push token. Notifications will not be received.");
        setLoading(false); 
        // Optionally return here if you require token for further process
    }

    if (image !== null && image1 !== null && image2 !== null) {
        const formData = {
            ...data,
            profilePic: image,
            frontCNIC: image1,
            backCNIC: image2,
            pushToken  // Include the token in the payload
        };

        axios.post(`${Constants.expoConfig.extra.IP_ADDRESS}/Signup`, formData)
        .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.status === "ok") {
                Alert.alert("Account created!", "Your registration will be confirmed once your details are verified.");
                navigation.navigate('Login');
            } else {
                Alert.alert("Error", res.data.message || "An error occurred");
                
            }
        })
        .catch(e => {
            console.error("Signup Error:", e);
            setLoading(false); 
            Alert.alert("Error", "Failed to sign up");
        });
    } else {
        alert("Make sure you have uploaded all pictures.");
        setLoading(false); 
    }
};

  
  const password = useWatch({ control, name: "password", defaultValue: "" });
  

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const deleteImage = async () => {
    try {
      setImage(null);
    } catch (error) {}
  };
  const deleteImage1 = async () => {
    try {
      setImage1(null);
    } catch (error) {}
  };
  const deleteImage2 = async () => {
    try {
      setImage2(null);
    } catch (error) {}
  };

  const uploadImage = async () => {
    try {
      let result = {};
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage("data:image/jpeg;base64," + result.assets[0].base64);
      }
    } catch (error) {
      // alert("Error uploading image: " + error.message);
    }
  };
  const uploadImage1 = async () => {
    try {
      let result = {};
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage1("data:image/jpeg;base64," + result.assets[0].base64);
      }
    } catch (error) {
      // alert("Error uploading image: " + error.message);
    }
  };
  const uploadImage2 = async () => {
    try {
      let result = {};
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        setImage2("data:image/jpeg;base64," + result.assets[0].base64);
      }
    } catch (error) {
      // alert("Error uploading image: " + error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/loginbg.png")}
      style={tw.style("h-full", {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <View style={styles.container}>
        <View
          style={tw.style(
            "flex-row",
            "justify-between",
            "bg-teal-900",
            "items-center",
            "px-2"
          )}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Routing");
            }}
          >
            <Image
              source={require("../assets/login/arrow-left.png")}
              style={styles.headerIcons}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>SignUp</Text>
          <View style={styles.headerIcons}></View>
        </View>
      </View>
      <ScrollView>
        <View style={tw.style("ml-4 mt-5")}>
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={uploadImage} onLongPress={deleteImage}>
              <Image
                source={
                  image ? { uri: image } : require("../assets/SignUp/User.png")
                }
                style={{
                  marginLeft: Dimensions.get("screen").width * 38/100,
                  marginBottom: 20,
                  marginTop: 10,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                }}
              />
            </TouchableOpacity>
            <Text style={[styles.label, { width: "28%" }]}>
              Enter your name
            </Text>

            <Controller
              control={control}
              rules={{
                required: "Name is required",
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="Name"
                  keyboardType={"default"}
                  onChangeText={onChange}
                  value={value}
                  defaultValue=""
                />
              )}
              name="name"
            />
            {errors && errors.name && <Text>{errors.name.message}</Text>}

            <Text style={[styles.label, { width: "28%" }]}>
              Enter your email
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="Email"
                  keyboardType={"email-address"}
                  onChangeText={onChange}
                  value={value}
                  defaultValue=""
                />
              )}
              name="email"
            />
            {errors && errors.email && <Text>{errors.email.message}</Text>}

            {/* <Text style={styles.label}>Create a Username</Text>
        <Controller
            control={control}
            rules={{
              required: 'Username is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="Username"
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="username"
          />
          {errors && errors.username && <Text>{errors.username.message}</Text>} */}

            <Text style={[styles.label, { width: "32%" }]}>
              Create a Password
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum length is 8 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                  defaultValue=""
                />
              )}
              name="password"
            />
            {errors && errors.password && (
              <Text>{errors.password.message}</Text>
            )}

            <Text style={[styles.label, { width: "31%" }]}>
              Confirm Password
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum length is 8 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                  defaultValue=""
                />
              )}
              name="confirmPassword"
            />
            {errors && errors.confirmPassword && (
              <Text>{errors.confirmPassword.message}</Text>
            )}

            <Text style={[styles.label, { width: "40%" }]}>
              Enter your CNIC number
            </Text>
            <Controller
              control={control}
              rules={{
                required: "CNIC is required",
                pattern: {
                  value: /^\d{5}\d{7}\d{1}$/,
                  message: "Invalid CNIC format. Use XXXXXXXXXXXXX format.",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="XXXXXXXXXXXXX"
                  keyboardType={"numeric"}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="cnic"
            />
            {errors.cnic && <Text>{errors.cnic.message}</Text>}

            <Text style={[styles.label, { width: "32%" }]}>
              Enter your Address
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Address is required",
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="Address"
                  keyboardType={"default"}
                  onChangeText={onChange}
                  value={value}
                  defaultValue=""
                />
              )}
              name="address"
            />
            {errors && errors.address && <Text>{errors.address.message}</Text>}

            <Text style={[styles.label, { width: "42%" }]}>
              Enter your Phone Number
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^03[0-9]{2}[0-9]{7}$/,
                  message:
                    "Invalid phone number format. Use 03XXXXXXXX format.",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Field
                  placeholder="03XXXXXXXX"
                  keyboardType={"numeric"}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phoneNumber"
            />
            {errors && errors.phoneNumber && (
              <Text>{errors.phoneNumber.message}</Text>
            )}

            <Text style={styles.uploadCnicText}>Upload CNIC pictures</Text>
            <View style={styles.cnicImagesContainer}>
              <TouchableOpacity
                style={styles.cnicImageWrapper}
                onPress={uploadImage1}
                onLongPress={deleteImage1}
              >
                <Image
                  source={
                    image1
                      ? { uri: image1 }
                      : require("../assets/SignUp/Upload.png")
                  } // Replace with your CNIC front icon image
                  style={styles.cnicImage}
                />
                <Text style={styles.cnicImageText}>Front</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cnicImageWrapper}
                onPress={uploadImage2}
                onLongPress={deleteImage2}
              >
                <Image
                  source={
                    image2
                      ? { uri: image2 }
                      : require("../assets/SignUp/Upload.png")
                  } // Replace with your CNIC back icon image
                  style={styles.cnicImage}
                />
                <Text style={styles.cnicImageText}>Back</Text>
              </TouchableOpacity>
            </View> 
            

            <View style={tw.style("mt-6", "items-center", "justify-center", {})}>
              <TouchableOpacity
                style={tw.style(
                  `rounded-full items-center w-30 py-3 px-5 my-5 mx-5`,
                  {
                    backgroundColor: "#1D4246",

                    marginBottom: Dimensions.get("screen").height * 6/100,
                    marginLeft: Dimensions.get("screen").width * 60/100,
                  }
                )}
                onPress={handleSubmit(onSubmit)}
                disabled={loading}  // Disable button when loading
              >
                <Text
                  style={tw.style("text-white", "text-lg", "font-bold", {
                    fontSize: 22,
                  })}
                >{loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" /> // Show loading spinner
                ) : (
                  "Sign Up"
                )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1D4246",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerIcons: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#47ADB8",
    padding: 5,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 0,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  uploadCnicText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    backgroundColor: "#1D4246",
    padding: 6,
    borderRadius: 10,
    width: "50%",
  },
  cnicImagesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginRight: "50%",
  },
  cnicImageWrapper: {
    alignItems: "center",
  },
  cnicImage: {
    width: 50,
    height: 50,
  },
  cnicImageText: {
    color: "white",
    backgroundColor: "#1D4246",
    padding: 6,
    fontWeight: "bold",
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  formContainer: {
    width: 400,
    marginStart: 5,
  },
  formTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  label: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginVertical: 0,
    backgroundColor: "#1D4246",
    padding: 6,
    borderRadius: 10,
  },

  formHeading: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: Dimensions.get("screen").width / 2,
  },
  errors: {
    color: "red",
  }

});
export default Signup;
