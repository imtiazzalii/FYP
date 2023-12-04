import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, Image, Platform, StatusBar,ImageBackground, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

const Content1 = () => {
    return(
        <View style={styles.card}>
            <View style={styles.userInfoContainer}>
                <Image source={require("../assets/Sidebar/dp.png")} style={styles.dp}/>
                <View style={styles.userInfo}>
                    <Text style={tw.style('font-bold text-white mt-4 ml-1')}> Zaki Imran</Text>
                    <Image source={require("../assets/CurrentTrips/star.png")}/>
                </View>
            </View>
            <View style={styles.divider2} />
            <View>
                <View style={styles.userInfoContainer}>
                <View>
                    <Image source={require("../assets/CurrentTrips/blackarrow.png")} />
                </View>
                <View style={tw.style("ml-2",{flexDirection:'column'})}>
                <View>
                    <Text style={tw.style('font-bold text-white')}>Departure</Text>
                    <Text style={tw.style('text-white text-xs')}>Lahore, Pakistan</Text>
                    <Text style={tw.style('text-xs',{color:'#47ADB8'})}>15-Oct-2024</Text>
                </View><View>
                    <Image source={require("../assets/CurrentTrips/Airplane.png")} />
                </View>
                <View>
                    <Text style={tw.style('font-bold text-white')}>Arrival</Text>
                    <Text style={tw.style('text-white text-xs')}>Lahore, Pakistan</Text>
                    <Text style={tw.style('text-xs',{color:'#47ADB8'})}>25-Oct-2024</Text>
                </View>
                </View>
            </View>
            </View>
            <View style={styles.divider2} />
            <View>
                <Text style={tw.style('font-bold text-white mb-1')}>Capacity</Text>
                <View style={tw.style('mb-2',{flexDirection:'row'})}>
                    <Image source={require("../assets/CurrentTrips/suitcase.png")} />
                    <Text style={tw.style('font-bold text-white text-xs ml-1 mt-1')}>20 KG</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            
                <Text style={tw.style('font-bold text-white')}>Bids</Text>
            <View style={styles.section}>
                <View>
                    <Text style={tw.style('text-white')}>Current bids:</Text>
                    <Text style={tw.style('text-white')}>Buyout:</Text>
                    <Text style={tw.style('text-white')}>Your bid:</Text>
                </View>
                <View style={tw.style({marginRight:'10%'})}>
                    <Text style={tw.style('text-white')}>Rs. 250</Text>
                    <Text style={tw.style('text-white')}>Rs. 1000</Text>
                    <Text style={tw.style('text-white')}>Rs. 0</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            <View style={tw.style({marginBottom:'30%'})}>
                <Text style={tw.style('font-bold text-white mt-1')}>Description</Text>
            </View>
        </View>
    );
}

const Filters = () => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [weight, setWeight] = useState('');
    const [cost, setCost] = useState(100);
    const [transportMode, setTransportMode] = useState('By Road');
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Filters</Text>
        <Image source={require("../assets/CurrentTrips/broadline.png")} style={styles.line} />
  
        {/* Departure City Dropdown */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Departure City:</Text>
          <Picker
            selectedValue={departureCity}
            onValueChange={(itemValue) => setDepartureCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Karachi" value="" />
            <Picker.Item label="Lahore" value="" />
            <Picker.Item label="Islamabad" value="" />
            <Picker.Item label="Peshawar" value="" />
            <Picker.Item label="Multan" value="" />
            <Picker.Item label="Quetta" value="" />
            <Picker.Item label="Faisalabad" value="" />
            <Picker.Item label="Select City" value="" />
            {/* Add your city options here */}
          </Picker>
        </View>
  
        {/* Arrival City Dropdown */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Arrival City:</Text>
          <Picker
            selectedValue={arrivalCity}
            onValueChange={(itemValue) => setArrivalCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Karachi" value="" />
            <Picker.Item label="Lahore" value="" />
            <Picker.Item label="Islamabad" value="" />
            <Picker.Item label="Peshawar" value="" />
            <Picker.Item label="Multan" value="" />
            <Picker.Item label="Quetta" value="" />
            <Picker.Item label="Faisalabad" value="" />
            <Picker.Item label="Select City" value="" />
            {/* Add your city options here */}
          </Picker>
        </View>
  
        {/* Weight Input Field */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Weight:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter weight in KG"
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
        </View>
  
        {/* Cost Slider */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Cost:</Text>
          <Slider
            style={styles.slider}
            minimumValue={100}
            maximumValue={100000}
            step={1}
            value={cost}
            onValueChange={(value) => setCost(value)}
          />
          <Text>{cost}</Text>
        </View>
  
        {/* Transport Mode Dropdown */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Transport Mode:</Text>
          <Picker
            selectedValue={transportMode}
            onValueChange={(itemValue) => setTransportMode(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="By Road" value="By Road" />
            <Picker.Item label="By Train" value="By Train" />
            <Picker.Item label="By Aeroplane" value="By Aeroplane" />
          </Picker>
        </View>
      </View>
    );
};

const Content22 = () => {
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
                <Text style={styles.label}>Time Remaining</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <Image source={require("../assets/OrderHistory/suitcase.png")} style={styles.iconW} />
                    <Text style={styles.infoText}>20 KG</Text>
                </View>
                <Text style={styles.infoText}>12:00:00</Text>
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
                            <Image source={require("../assets/OrderHistory/star.png")} style={styles.iconstar} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const Content2 = () => {
    
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    
    return(
        <View style={styles.box}>
            <View>
                <TouchableOpacity onPress={toggleFilters}>
                    <Image source={require("../assets/CurrentTrips/filters.png")} style={[styles.filters, showFilters && { tintColor: '#007BFF' }]} />
                </TouchableOpacity>
            </View>
            <View>
                {showFilters === true ? <Filters /> : null}
                {showFilters === false ? <Content22 /> : null}
            </View>
            
        </View>
    );
}

const CurrentTrips = () => {
    
    const [selectedButton, setSelectedButton] = useState('Details');
  
    const handleButtonPress = (button) => {
      setSelectedButton(button);
    };
  
    return (
      <ImageBackground
        source={require('../assets/Dashboard/dashbg.jpeg')}
        style={tw.style('h-full')}
      >
        <ScrollView>
          <View style={tw.style({paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0})}>
            <View
              style={tw.style(
                'flex-row',
                'justify-between',
                'bg-teal-900',
                'items-center',
                'px-2'
              )}
            >
              <Image
                source={require('../assets/Dashboard/menu2.png')}
                style={styles.headerIcons}
              />
              <Text style={styles.headerText}>Current Trips</Text>
              <Image
                source={require('../assets/Dashboard/bell2.png')}
                style={styles.headerIcons}
              />
            </View>
            <View style={styles.toggleButtonsContainer}>
              <TouchableOpacity
                onPress={() => handleButtonPress('Details')}
                style={[
                  styles.toggleButton,
                  selectedButton === 'Details' && styles.toggleButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    selectedButton === 'Details' && styles.toggleButtonTextSelected,
                  ]}
                >
                  Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleButtonPress('trips')}
                style={[
                  styles.toggleButton,
                  selectedButton === 'trips' && styles.toggleButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    selectedButton === 'trips' && styles.toggleButtonTextSelected,
                  ]}
                >
                  Trips
                </Text>
              </TouchableOpacity>
            </View>
  
            {selectedButton === 'Details' ? <Content1 /> : <Content2 />}
            
          </View>
        </ScrollView>
        <View style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900")}>
            <Text style={tw`text-white text-sm pr-4`}>swyftbags ltd.</Text>
       </View>
      </ImageBackground>
    );
  };

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
      
      toggleButtonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width:'60%',
        marginVertical: 20,
        backgroundColor: '#E8F9FD',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#B0E0E6',
      },
      toggleButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 0,
      },
      toggleButtonSelected: {
        backgroundColor: '#1D4246',
      },
      toggleButtonText: {
        color: '#47ADB8',
        fontWeight: 'bold',
        textAlign:'center',
      },
      toggleButtonTextSelected: {
        color: '#FFFFFF',
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
        width: 80, // Adjust the width of the arrow icon
        height: 50, // Adjust the height of the arrow icon
        resizeMode: 'contain', // Make sure the arrow icon fits into the container
    },
    iconW: {
        width: 20,
        height: 20,
    },
    iconstar: {
        width: 12,
        height: 15,
        marginTop:3,
        marginLeft:3,
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
    divider2: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop:10,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dp: {
        height: 50,
        width: 50,
        borderRadius: 60,
    },
    filters: {
        width: 30,
        height: 30,
    },
    container: {
        padding: 16,
      },
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      line: {
        height: 2,
        backgroundColor: '#CCCCCC',
        marginBottom: 20,
      },
      filterContainer: {
        marginBottom: 20,
      },
      filterLabel: {
        fontSize: 16,
        marginBottom: 8,
      },
      picker: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
      },
      inputField: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        paddingHorizontal: 10,
      },
      slider: {
        width: '100%',
      },
      userInfoContainer: {
        flexDirection:'row',

      },
      userInfo: {
        // Add styles for user info container
        flexDirection: 'col',
        alignItems: 'center',
      },
      userName: {
        // Add styles for user name
        fontSize: 14,
        color:'white',
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom:5, // Add margin to lower the text
      },
});

export default CurrentTrips;