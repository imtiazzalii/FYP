import React, {useState} from 'react';
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

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
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require("../assets/OrderHistory/backarrow.png")}  style={styles.headerIcons}/>
                    <Text>History</Text>
                    <Image source={require("../assets/Dashboard/bell2.png")}  style={styles.headerIcons}/>
                </View>
                <View>
                    <Button title="My Orders" onPress={() => handleButtonPress('button1')} color={selectedButton === 'button1' ? '#007BFF' : '#CCCCCC'}/>
                    <Button title="My Trips" onPress={() => handleButtonPress('button2')} color={selectedButton === 'button2' ? '#007BFF' : '#CCCCCC'}/>
                </View>
                <View>
                    {selectedButton === 'button1' ? <Content1 /> : null}
                    {selectedButton === 'button2' ? <Content2 /> : null}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
});

export default OrderHistory;