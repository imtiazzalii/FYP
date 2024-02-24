import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';



const Content1 = ({ userData }) => {
// Main card
    return (
        <View style={styles.maincard}>
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.mainText}>{userData.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.cardText}>Rating</Text>
                            <Text style={styles.cardText}>5</Text>
                            <Image source={require("../assets/OrderHistory/star.png")} style={styles.iconstar} />
                        </View>
                    </View>
                </View>
                    <Image source={{uri: userData.profilePic}} style={styles.icon} />
            </View>
        </View>
    );
};


const Content2 = ({ userData }) => {
// Details Section
  return (
      <View style={styles.card}>
          <View style={styles.section}>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>Username:</Text>
          </View>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>{userData.name}</Text>
          </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.section}>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>Email:</Text>
          </View>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>{userData.email}</Text>
          </View>
          </View>
          <View style={styles.divider} />
          

          <View style={styles.section}>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>Phone Number:</Text>
          </View>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>{userData.phoneNumber}</Text>
          </View>
          </View>
          <View style={styles.divider} />


          <View style={styles.section}>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>CNIC:</Text>
          </View>
          <View style={styles.infoContainer1}>
              <Text style={styles.infoText}>{userData.cnic}</Text>
          </View>
          </View>
      </View>
  );
};


const Content3 = () => {
// Change Password section
  const navigation = useNavigation();
  return (
      <View style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
          <View style={styles.section}>
          </View>
          <View style={styles.section}>
              <View style={styles.infoContainer}>
                  <View>
                      <Text style={styles.infoText}>Edit</Text>
                  </View>
              </View>
                  <Image source={require("../assets/Profile/Chevron.png")} style={styles.chevron} />
              
          </View>
          </TouchableOpacity>
      </View>
  );
};

const Profile = () => {
  const [selectedButton, setSelectedButton] = useState('myOrders');
  const navigation = useNavigation();
  const [userData, setUserData] = useState('');
    const handleButtonPress = (button) => {
      setSelectedButton(button);
    };

    const getData = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          console.log(token);
          const response = await axios.post(Constants.expoConfig.extra.IP_ADDRESS + '/userData', { token: token });
          setUserData(response.data.data);
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      getData();
  }, []);

    
  
    return (
      <ImageBackground
        source={require('../assets/bng.png')}
        style={tw.style('h-full', {marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,})}
      >

        <ScrollView>
        <View
              style={tw.style(
                'flex-row',
                'justify-between',
                'bg-teal-900',
                'items-center',
                'px-2',
                'pt-1',
                'pb-1'
              )}
            >
              <TouchableOpacity onPress={() => {
                  navigation.openDrawer();
                }}>
              <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/>
              </TouchableOpacity>
              <Text style={styles.headerText}>Profile</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
              <Image source={require('../assets/Dashboard/bell2.png')} style={styles.headerIcons}/>
              </TouchableOpacity>
            </View>
            
            <View> 
            {/* For display and name */}
            <Content1 userData={userData} />
            </View>

            <View>
              {/* Editable button */}

                <View style={styles.newcard}>
                  <View style={styles.section}>
                    <View style={styles.infoContainer1}>
                      <Text style={styles.cardText}>Personal Information:</Text>
                    </View>
                    <View style={styles.infoContainer1}>
                      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                        <Image source={require("../assets/Profile/Edit.png")} style={styles.cardText}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  </View>

              {/* For details section */}
              <Content2 userData={userData} />
            </View>

            <View>
              {/* For Change Password section */}
              <Content3 />
            </View>
        </ScrollView>

        {/* Rate our app button */}
        <View style={styles.bottomright}>
          <TouchableOpacity onPress={() => console.log('Rate')}>      
          <Text style={styles.infoText}>Rate Our App</Text>
          </TouchableOpacity>
        </View>
        
        <View style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900 absolute bottom-8 w-full")}>
                    <Text style={tw`text-white text-sm`}>swyftbags ltd.</Text>
                </View>
        
        {/* <View style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900")}>
            <Text style={tw`text-white text-sm pr-4`}>swyftbags ltd.</Text>
        </View> */}
        
      </ImageBackground>
    );
  };


const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,

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
      
      newcard: {
        paddingHorizontal:16,
        marginVertical: -15,
        marginHorizontal:'5%',
      },

      maincard: {
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
        margin:'5%',
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
    bottomright: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      marginBottom: 0,
      position: 'absolute',
      bottom: 60,
      right: 5,
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

    mainText: {
      color: 'black',
      marginTop: 2, // Add some space between text and date
      marginLeft:2,
      fontWeight:'bold',
      fontSize:30,
    },

    cardText: {
      color: 'black',
      marginTop: 2, // Add some space between text and date
      marginLeft:2,
      fontSize:16,
      fontWeight: 'bold',
  },
    
    infoText: {
        color: 'white',
        marginTop: 2, // Add some space between text and date
        marginLeft:2,
        fontSize:16,
    },
    dateText: {
        color: '#47ADB8',
    },
    arrowIcon: {
        width: 80, // Adjust the width of the arrow icon
        height: 50, // Adjust the height of the arrow icon
        resizeMode: 'contain', // Make sure the arrow icon fits into the container
    },

    iconstar: {
        width: 12,
        height: 15,
        marginTop:3,
        marginLeft:3,
    },

    chevron: {
        width: 30,
        height:30,
    },

    icon: {
        width: 80,
        height: 80,
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

export default Profile;