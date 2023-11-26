import React, {useState} from 'react';
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';


const Content1 = () => {
    return(
        <View style={styles.box}>
            <View>
                <Text>Departure</Text>
                <Text>Arrival</Text>
            </View>
            <View>
                <View>
                    <Text>Karachi, Pakistan</Text>
                    <Text>25-Oct-2024</Text>
                </View>
                <View>
                    <Image source={require("../assets/OrderHistory/arrow.png")} />
                </View>
                <View>
                    <Text>Lahore, Pakistan</Text>
                    <Text>25-Oct-2024</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/OrderHistory/line.png")} />
            </View>
            <View>
                <Text>Item Weight</Text>
                <Text>Status</Text>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/OrderHistory/suitcase.png")} />
                    <Text>20 KG</Text>
                </View>
                <View>
                    <Text>In Progress</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/OrderHistory/line.png")} />
            </View>
            <View>
                <Text>Sender</Text>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/OrderHistory/user.png")} />
                    <View>
                        <Text>Ahad Ghouri</Text>
                        <View>
                            <Text>5</Text>
                            <Image source={require("../assets/OrderHistory/star.png")} />
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={require("../assets/OrderHistory/chat.png")} />
                    <Text>Open Chat</Text>
                </View>
            </View>
        </View>
    );
}
const Content2 = () => {
    return(
        <View style={styles.box}>
            <View>
                <Text>Departure</Text>
                <Text>Arrival</Text>
            </View>
            <View>
                <View>
                    <Text>Karachi, Pakistan</Text>
                    <Text>25-Oct-2024</Text>
                </View>
                <View>
                    <Image source={require("../assets/OrderHistory/arrow.png")} />
                </View>
                <View>
                    <Text>Lahore, Pakistan</Text>
                    <Text>25-Oct-2024</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/OrderHistory/line.png")} />
            </View>
            <View>
                <Text>Capacity</Text>
                <Text>Cost</Text>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/OrderHistory/suitcase.png")} />
                    <Text>20 KG</Text>
                </View>
                <View>
                    <Text>Rs. 500</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/OrderHistory/line.png")} />
            </View>
            <View>
                <Text>Traveller</Text>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/OrderHistory/user.png")} />
                    <View>
                        <Text>Ahad Ghouri</Text>
                        <View>
                            <Text>5</Text>
                            <Image source={require("../assets/OrderHistory/star.png")} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

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
});

export default OrderHistory;