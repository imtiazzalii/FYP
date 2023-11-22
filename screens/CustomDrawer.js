import {View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, Platform, Image} from 'react-native';
import React from 'react';

const CustomDrawer = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Zaki Imran</Text>
                <Image source={require("../assets/Sidebar/dp.png")} style={styles.dp}/>
            </View>
            <View>
                <Image source={require("../assets/Sidebar/line.png")}/>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/Sidebar/home.png")} style={styles.icons}/>
                    <Text style={styles.text}>Home</Text>
                </View>
                <View>
                    <Image source={require("../assets/Sidebar/mytrips.png")} style={styles.icons}/>
                    <Text style={styles.text}>My trips</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/Sidebar/line.png")}/>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/Sidebar/help.png")} style={styles.icons}/>
                    <Text style={styles.text}>Help Centre</Text>
                </View>
                <View>
                    <Image source={require("../assets/Sidebar/terms.png")} style={styles.icons}/>
                    <Text style={styles.text}>Terms and conditions</Text>
                </View>
                <View>
                    <Image source={require("../assets/Sidebar/logout.png")} style={styles.icons}/>
                    <Text style={styles.text}>Logout</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:"#102426",
      },
    text: {
        color: "white",
    },
    dp: {
        height: 50,
        width: 50,
        borderRadius: 60,
    },
    icons: {

    },
});

export default CustomDrawer;