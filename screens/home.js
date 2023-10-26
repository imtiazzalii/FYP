import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import Background from "./background";
import Btn from "./btn";

const Home = (props) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>SWYFTBAGS</Text>
        <Text style={styles.subtitle}>YOUR BAGS ON THE GO !!</Text>
        <View style={styles.buttonContainer}>
          <Btn
            bgColor="#A9C1C4"
            textColor="black"
            btnLabel="Signup"
            Press={() => props.navigation.navigate("Signup")}
          />
          <Btn
            bgColor="#47ADB8"
            textColor="#000101"
            btnLabel="Login"
            Press={() => props.navigation.navigate("Login")}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginVertical: 180,
    alignItems: "center",
  },
  title: {
    color: 'white',
    fontSize: 52,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
  },
  subtitle: {
    color: 'black',
    fontSize: 46,
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 40,
  },
});

export default Home;
