import { View, StyleSheet, Text, ImageBackground, Image, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const TripStatus = () => {

    return (
        <ImageBackground source={require('../assets/AllChats/Background.png')}
            style={tw.style('h-full', { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 })}>
            <ScrollView>
                
                
                <View style={styles.container}>

                    <View style={styles.navBar}>
                            <Image source={require("../assets/login/arrow-left.png")} style={styles.headerIcons} />
                        <Text style={styles.headerText}>Chats</Text>
                        <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons} />
                    </View>


                        {/* Content of page */}
                    <View style= {tw.style('flex-row', 'items-center','justify-center', 'pt-5')}>
                        <Image source={require("../assets/TripStatus/Details.png")}/>
                    </View>


                    <View style= {tw.style('flex-row', 'items-center','justify-center','pt-10')}>
                        <Image source={require("../assets/TripStatus/Content.png")}/> 
                    </View>
  
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D4246',
        padding: 8,
        marginBottom:'7%'
    },
    footerText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
});

export default TripStatus;
