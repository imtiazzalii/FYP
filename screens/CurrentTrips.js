import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, Image, Platform, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

const Content1 = () => {
    return(
        <View style={styles.box}>
            <View>
                <Image source={require("../assets/Sidebar/dp.png")} style={styles.dp}/>
                <View>
                    <Text>Zaki Imran</Text>
                    <Image source={require("../assets/CurrentTrips/star.png")}/>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")}/>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/CurrentTrips/blackarrow.png")} />
                </View>
                <View>
                    <Text>Departure</Text>
                    <Text>Lahore, Pakistan</Text>
                    <Text>15-Oct-2024</Text>
                </View>
                <View>
                    <Image source={require("../assets/CurrentTrips/Airplane.png")} />
                </View>
                <View>
                    <Text>Arrival</Text>
                    <Text>Lahore, Pakistan</Text>
                    <Text>25-Oct-2024</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            <View>
                <Text>Capacity</Text>
                <View>
                    <Image source={require("../assets/CurrentTrips/suitcase.png")} />
                    <Text>20 KG</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            <View>
                <Text>Bids</Text>
                <View>
                    <Text>Current bids:</Text>
                    <Text>Buyout:</Text>
                    <Text>Your bid:</Text>
                </View>
                <View>
                    <Text>Rs. 250</Text>
                    <Text>Rs. 1000</Text>
                    <Text>Rs. 0</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            <View>
                <Text>Description</Text>
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
    return(
        <View>
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
                    <Image source={require("../assets/CurrentTrips/arrow.png")} />
                </View>
                <View>
                    <Text>Lahore, Pakistan</Text>
                    <Text>25-Oct-2024</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            <View>
                <Text>Capacity</Text>
                <Text>Time Remaining</Text>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/CurrentTrips/suitcase.png")} />
                    <Text>20 KG</Text>
                </View>
                <View>
                    <Text>12:00:00</Text>
                </View>
            </View>
            <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
            </View>
            <View>
                <Text>Traveller</Text>
            </View>
            <View>
                <View>
                    <Image source={require("../assets/CurrentTrips/user.png")} />
                    <View>
                        <Text>Ahad Ghouri</Text>
                        <View>
                            <Text>5</Text>
                            <Image source={require("../assets/CurrentTrips/star.png")} />
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
    
    const [selectedButton, setSelectedButton] = useState('button1');
    
    const handleButtonPress = (button) => {
        setSelectedButton(button);
    };

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require("../assets/CurrentTrips/backarrow.png")}  style={styles.headerIcons}/>
                    <Text>History</Text>
                    <Image source={require("../assets/CurrentTrips/bell2.png")}  style={styles.headerIcons}/>
                </View>
                <View>
                    <Button title="Details" onPress={() => handleButtonPress('button1')} color={selectedButton === 'button1' ? '#007BFF' : '#CCCCCC'}/>
                    <Button title="Trips" onPress={() => handleButtonPress('button2')} color={selectedButton === 'button2' ? '#007BFF' : '#CCCCCC'}/>
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
});

export default CurrentTrips;