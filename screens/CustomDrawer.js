import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';

import tw from 'twrnc';
import {useNavigation, CommonActions} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';



const CustomDrawer = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');
            if (token && userId) {
                await axios.post(`${Constants.expoConfig.extra.IP_ADDRESS}/logout`, { userId }, {
                    headers: { Authorization: token }
                });
            }
            AsyncStorage.setItem('isLoggedIn','');
            AsyncStorage.setItem('token','');
            AsyncStorage.setItem('userId', '');
            navigation.navigate("LoginNav");
        } catch (error) {
            console.error("Logout Error:", error);
            Alert.alert("Logout Failed", "Unable to logout. Please try again.");
        }
    };

    // const [userData, setUserData] = useState('');

    // const getData = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         console.log(token);
    //         const response = await axios.post(Constants.expoConfig.extra.IP_ADDRESS + '/userData', { token: token });
    //         setUserData(response.data.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
  
    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                {/* <Image source={require("../assets/Sidebar/home.png")} style={styles.dp} />  */}
                {/* uri: userData.profilePic */}
                <Text style={tw.style('text-white text-xl font-bold ml-5 mt-5')}>SWYFTBAGS</Text>
            </View>
            
            {/* Separator */}
            <View style={styles.separator} />

            {/* Menu Section */}
            <View style={styles.menuSection}>
                <TouchableOpacity onPress={() => navigation.navigate("Dashboard")} style={styles.menuItem}>
                    <Image source={require("../assets/Sidebar/home.png")} style={styles.icons} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("Profile")
                }}>
                    <Image source={require("../assets/Sidebar/mytrips.png")} style={styles.icons} />
                    <Text style={styles.text}>My Profile</Text>
                </TouchableOpacity>
            </View>
            
            {/* Separator */}
            <View style={styles.separator2} />

            {/* Bottom Menu Section */}
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("HelpDesk")}>
                    <Image source={require("../assets/Sidebar/help.png")} style={styles.icons} />
                    <Text style={styles.text}>Help Centre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("TermsCondition")}>
                    <Image source={require("../assets/Sidebar/terms.png")} style={styles.icons} />
                    <Text style={styles.text}>Terms and conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Image source={require("../assets/Sidebar/logout.png")} style={styles.icons} />
                <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#102426",
        justifyContent: 'space-between',
    },
    text: {
        color: "white",
        paddingLeft: 2, // Adjust as per your design
    },
    dp: {
        height: 70, // Adjusted to match the design
        width: 70, // Adjusted to match the design
        borderRadius: 40, // Adjusted to match the design
        marginVertical: 20,
        marginHorizontal: 10,
    },
    icons: {
        height: 25, // Adjusted to match the design
        width: 25, // Adjusted to match the design
        marginHorizontal: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%', // Adjust as per your design
    },
    menuSection: {
        marginVertical:'5%'
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Adjust as per your design
    },
    separator: {
        borderBottomColor: '#ffffff', // Assuming a white separator line
        borderBottomWidth: 1, // Adjust as per your design
        marginVertical: 10, // Adjust as per your design
    },
    separator2: {
        borderBottomColor: '#ffffff', // Assuming a white separator line
        borderBottomWidth: 1, // Adjust as per your design
        marginTop: '120%', // Adjust as per your design
    },
});

export default CustomDrawer;
