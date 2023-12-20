import { View, StyleSheet, Text, ImageBackground, Image, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const AllChats = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/AllChats/Background.png')}
            style={tw.style('h-full', { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 })}>
            <ScrollView>
                <View style={styles.container}>
                    {/* NavBar */}
                    <View style={styles.navBar}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Chats</Text>
                        <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons} />
                    </View>

                    {/* Chat Items */}
                    <View style={styles.chatItemsContainer}>
                        {/* First Chat Item */}
                        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate("Chat")}>
                            <Image source={require("../assets/AllChats/User.png")} style={styles.userIcon} />
                            <View style={styles.chatTextContainer}>
                                <Text style={styles.userName}>Zaki Imran</Text>
                                <Text style={styles.messageText}>Hello Ahad how much space do u have?</Text>
                                <View style={styles.timeAndStatusContainer}>
                                    <Text style={styles.messageTime}>8:00pm</Text>
                                    {/* Include Tick Icon only if message is sent */}
                                    <Image source={require("../assets/AllChats/Tick.png")} style={styles.statusIcon} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Second Chat Item */}
                        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate("Chat")}>
                            <Image source={require("../assets/AllChats/User.png")} style={styles.userIcon} />
                            <View style={styles.chatTextContainer}>
                                <Text style={styles.userName}>Imtiaz Mushfiq</Text>
                                <Text style={styles.messageText}>Hello Imtiaz how much space do u have?</Text>
                                <Text style={styles.messageTime}>4:00pm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>swyftbags ltd.</Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent', // Assuming the ImageBackground covers the entire container
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1D4246', // Adjust the color to match your design
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    headerIcons: {
        width: 24,
        height: 24,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#47ADB8', // Adjust the color to match your design
    },
    chatItemsContainer: {
        paddingVertical: 10,
    },
    chatItem: {
        flexDirection: 'row',
        backgroundColor: '#E8F0F2', // Use the background color of your chat item
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        alignItems: 'center',
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
        fontWeight: 'bold',
        color: '#00334E', // Use your username color here
        marginBottom: 5,
    },
    messageText: {
        fontSize: 14,
        color: '#00334E', // Use your message text color here
    },
    timeAndStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    messageTime: {
        fontSize: 12,
        color: '#00334E', // Use your message time color here
    },
    statusIcon: {
        width: 16,
        height: 16,
        marginLeft: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D4246', // Adjust the color to match your design
        padding: 10,
    },
    footerText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
});

export default AllChats;
