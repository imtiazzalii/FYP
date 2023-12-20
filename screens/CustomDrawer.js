import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const CustomDrawer = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image source={require("../assets/Sidebar/dp.png")} style={styles.dp} />
                <Text style={tw.style('text-white text-xl font-bold ml-2')}>Zaki Imran</Text>
            </View>
            
            {/* Separator */}
            <View style={styles.separator} />

            {/* Menu Section */}
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require("../assets/Sidebar/home.png")} style={styles.icons} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                    navigation.navigate("OrderHistory")
                }}>
                    <Image source={require("../assets/Sidebar/mytrips.png")} style={styles.icons} />
                    <Text style={styles.text}>My Trips</Text>
                </TouchableOpacity>
            </View>
            
            {/* Separator */}
            <View style={styles.separator2} />

            {/* Bottom Menu Section */}
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require("../assets/Sidebar/help.png")} style={styles.icons} />
                    <Text style={styles.text}>Help Centre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={require("../assets/Sidebar/terms.png")} style={styles.icons} />
                    <Text style={styles.text}>Terms and conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
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
