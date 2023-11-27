import React, {useState} from 'react';
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';


const Content1 = () => {
    return (
        <View style={styles.card}>
            {/* Departure and Arrival Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Departure</Text>
                <Text style={styles.label}>Arrival</Text>
            </View>
            <View style={styles.section}>
            <View style={styles.infoContainer1}>
                <Text style={styles.infoText}>Karachi, Pakistan</Text>
                <Text style={styles.dateText}>25-Oct-2024</Text>
            </View>
            
            <View style={styles.arrowContainer}>
                    {/* Adjust the arrow icon styles */}
                    <Image source={require("../assets/OrderHistory/arrow.png")} style={styles.arrowIcon} />
                </View>
            <View style={styles.infoContainer1}>
                <Text style={styles.infoText}>Lahore, Pakistan</Text>
                <Text style={styles.dateText}>25-Oct-2024</Text>
            </View>
            </View>
            
            <View style={styles.divider} />

            {/* Item Weight and Status Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Item Weight</Text>
                <Text style={styles.label}>Status</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <Image source={require("../assets/OrderHistory/suitcase.png")} style={styles.iconW} />
                    <Text style={styles.infoText}>20 KG</Text>
                </View>
                <Text style={styles.statusText}>In Progress</Text>
            </View>

            <View style={styles.divider} />

            {/* Sender Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Sender</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <Image source={require("../assets/OrderHistory/user.png")} style={styles.icon} />
                    <View>
                        <Text style={styles.infoText}>Ahad Ghouri</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.infoText}>5</Text>
                            <Image source={require("../assets/OrderHistory/star.png")} style={styles.iconW} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => console.log('Open chat')}>
                    <Image source={require("../assets/OrderHistory/chat.png")} style={styles.icon} />
                    <Text style={styles.chatText}>Open Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const Content2 = () => {
    return (
        <View style={styles.card}>
            {/* Departure and Arrival Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Departure</Text>
                <Text style={styles.label}>Arrival</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.infoContainer1}>
                    <Text style={styles.infoText}>Karachi, Pakistan</Text>
                    <Text style={styles.dateText}>25-Oct-2024</Text>
                </View>

                <View style={styles.arrowContainer}>
                    <Image source={require("../assets/OrderHistory/arrow.png")} style={styles.arrowIcon} />
                </View>

                <View style={styles.infoContainer1}>
                    <Text style={styles.infoText}>Lahore, Pakistan</Text>
                    <Text style={styles.dateText}>25-Oct-2024</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Capacity and Cost Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Capacity</Text>
                <Text style={styles.label}>Cost</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <Image source={require("../assets/OrderHistory/suitcase.png")} style={styles.iconW} />
                    <Text style={styles.infoText}>20 KG</Text>
                </View>
                <Text style={styles.infoText}>Rs. 500</Text>
            </View>

            <View style={styles.divider} />

            {/* Traveller Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Traveller</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <Image source={require("../assets/OrderHistory/user.png")} style={styles.icon} />
                    <View>
                        <Text style={styles.infoText}>Ahad Ghouri</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.infoText}>5</Text>
                            <Image source={require("../assets/OrderHistory/star.png")} style={styles.iconW} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const OrderHistory = () => {
    
    const [selectedButton, setSelectedButton] = useState('button1');
    const handleButtonPress = (button) => {
        setSelectedButton(button);
    };

    return(
        <ImageBackground
      source={require('../assets/Dashboard/dashbg.jpeg')}
      style={ tw.style('h-full')}
    >
        <ScrollView>
            <View style={styles.container}>
                <View style={tw.style('flex-row','justify-between', 'bg-teal-900','items-center', 'px-2')}>
                    <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/>
                    <Text style={styles.headerText}>History</Text>
                    <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons}/>
                </View>
                <View style={styles.buttonContainer}>
                    {/* My Orders TouchableOpacity */}
                    <TouchableOpacity
                        onPress={() => handleButtonPress('button1')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>My Orders</Text>
                    </TouchableOpacity>

                    {/* My Trips TouchableOpacity */}
                    <TouchableOpacity
                        onPress={() => handleButtonPress('button2')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>My Trips</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {selectedButton === 'button1' ? <Content1 /> : null}
                    {selectedButton === 'button2' ? <Content2 /> : null}
                </View>
            </View>
        </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    },
    box: {
        width:'70%', // Set the width to half of the screen width
        backgroundColor: '#fff', // Set the background color
        padding: 20, // Add padding for content inside the box
        justifyContent: 'center', // Center content vertically
        alignSelf: 'center', // Center the box horizontally
        marginTop: 20, // Add top margin for spacing
        borderRadius: 10, // Add border radius for rounded corners
        borderWidth: 1, // Add border width for a border
        borderColor: '#004d40', // Set border color
      },

    headerIcons: {
        width: 20,
        height: 20,
      },
      headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color:'#47ADB8',
        padding:5,
    
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      button: {
        padding: 10,
        marginTop:5,
        borderRadius: 0,
        borderWidth:1,
        borderColor:'white',
        paddingright:6,
        backgroundColor: '#004d40',
      },
      buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight:'bold',
      },
      card: {
        backgroundColor: '#1D4246',
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
        margin:'5%',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
    },
    infoContainer: {
        flexDirection: 'row', // Stack date below the text
        alignItems: 'flex-start',
    },
    infoContainer1: {
        flexDirection: 'column', // Stack date below the text
        alignItems: 'flex-start',
    },
    
    infoText: {
        color: 'white',
        marginTop: 2, // Add some space between text and date
        marginLeft:2,
        fontSize:14,
    },
    dateText: {
        color: '#47ADB8',
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6, // Adjust the marginTop to ensure visibility
    },
    arrowIcon: {
        width: 110, // Adjust the width of the arrow icon
        height: 50, // Adjust the height of the arrow icon
        resizeMode: 'contain', // Make sure the arrow icon fits into the container
    },
    iconW: {
        width: 20,
        height: 20,
    },

    icon: {
        width: 35,
        height: 35,
    },
    statusText: {
        color: '#2D9CDB', // Change as needed to match status color
    },
    chatText: {
        color: '#2D9CDB',
        textAlign: 'center',
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default OrderHistory;