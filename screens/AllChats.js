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
                                <View style={styles.timeAndStatusContainer}>
                                <Text style={styles.messageText}>Hello Ahad how much space do you have?</Text>
                                <Image source={require("../assets/AllChats/Tick.png")} style={styles.statusIcon} />
                                </View>
                                <Text style={styles.messageTime}>8:00pm</Text>
                            </View>
                        </TouchableOpacity>


                        {/* Second Chat Item */}
                        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate("Chat")}>
                            <Image source={require("../assets/AllChats/User.png")} style={styles.userIcon} />
                            <View style={styles.chatTextContainer}>
                                <Text style={styles.userName}>Imtiaz Mushfiq</Text>
                                <View style={styles.timeAndStatusContainer}>
                                <Text style={styles.messageText}>Hello Imtiaz how much space do you have?</Text>
                                <Image source={require("../assets/AllChats/Tick.png")} style={styles.statusIcon} />
                                </View>
                                <Text style={styles.messageTime}>4:00pm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    
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
        paddingVertical: '10%',
    },
    chatItem: {
        flexDirection: 'row',
        backgroundColor: '#1D4246', // Use the background color of your chat item
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
        color: 'white', // Use your username color here
        marginBottom: 5,
        marginTop:5,
    },
    messageText: {
        fontSize: 14,
        color: 'white', // Use your message text color here
    // If you want to truncate the text when it is too long, you can add the following lines:
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    marginRight: 4, // Add space for the tick icon
    },
    timeAndStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    messageTime: {
        fontSize: 12,
        color: 'white', // Use your message time color here
        marginRight: 4, // Add space between time and tick icon
    },
    statusIcon: {
        width: 16,
        height: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D4246', // Adjust the color to match your design
        padding: 8,
        marginBottom:'9%',
    },
    footerText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
});

export default AllChats;
